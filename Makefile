# Variables
STAGING_IP       = mattia@192.168.1.99
PROD_IP    	 = mattia@192.168.1.100
PROD_IP_FALLBACK = root@159.69.159.185
PRODUCTION_HOSTS = $(PROD_IP) $(PROD_IP_FALLBACK)
DEST_PATH        = /shared_fs/data/landing-page
LOCAL_PATH       = /gates-stack-structure/data/landing-page

.PHONY:  backup-prod deploy-prod ask-confirmation

# Testing procedures

build-local:
	@vite build --mode development	

build-staging:
	@vite build --mode staging	

build-prod:
	@vite build --mode production	

# Backup procedures

backup-staging:
	@echo "Starting backup staging"
	@ssh $(STAGING_IP) "cp -r $(DEST_PATH) $(DEST_PATH).bak";
	@echo "Backup staging successful"

backup-prod:
	@echo "Starting backup production (italy and germany)"
	@set -e; for host in $(PRODUCTION_HOSTS); do \
		echo "Backing up $$host..."; \
		ssh $$host "cp -r $(DEST_PATH) $(DEST_PATH).bak"; \
	done
	@echo "Backup production successful"

# Deployment procedures

ask-confirmation:
	@read -p 'Are you sure you want to deploy to PRODUCTION? (y/N) ' ans; \
	if [ "$$ans" != "y" ]; then \
		echo "Aborted."; exit 1; \
	fi

deploy-local: build-local
	cp -r dist/* $(LOCAL_PATH)

deploy-staging: build-staging backup-staging
	@echo "Starting deployment staging"
	rsync -azP --delete dist/ $(STAGING_IP):$(DEST_PATH)	
	@echo "DEPLOYED STAGING"

# Deploys in multiple servers
deploy-prod: build-prod ask-confirmation backup-prod
	@echo "Starting deployment production (italy and germany)"
	@set -e; for host in $(PRODUCTION_HOSTS); do \
		echo "Deploying to $$host..."; \
		rsync -azP --delete dist/ $$host:$(DEST_PATH); \
	done
	@echo "Deployed In Production"

