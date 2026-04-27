# Variables
LOCAL_HOST       = mattia@127.0.0.1
STAGING_HOST       = mattia@192.168.1.99
PROD_HOST    	 = mattia@192.168.1.100
PROD_HOST_FALLBACK = root@159.69.159.185
DEPLOY_PATH      = stack-structure/data/landing-page
PRODUCTION_HOSTS = $(PROD_HOST) $(PROD_HOST_FALLBACK)

RSYNC_FLAG := -azP --delete --exclude '.gitkeep'


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
	@ssh $(STAGING_HOST) "cp -r $(DEPLOY_PATH) $(DEPLOY_PATH).bak";
	@echo "Backup staging successful"

backup-prod:
	@echo "Starting backup production (italy and germany)"
	@set -e; for host in $(PRODUCTION_HOSTS); do \
		echo "Backing up $$host..."; \
		ssh $$host "cp -r $(DEPLOY_PATH) $(DEPLOY_PATH).bak"; \
	done
	@echo "Backup production successful"

# Deployment procedures

ask-confirmation:
	@read -p 'Are you sure you want to deploy to PRODUCTION? (y/N) ' ans; \
	if [ "$$ans" != "y" ]; then \
		echo "Aborted."; exit 1; \
	fi

deploy-local: build-local
	rsync -azP --delete dist/ $(LOCAL_HOST):$(DEPLOY_PATH)	

deploy-staging: build-staging backup-staging
	@echo "Starting deployment staging"
	rsync $(RSYNC_FLAG) dist/ $(STAGING_HOST):$(DEPLOY_PATH)	
	@echo "DEPLOYED STAGING"

# Deploys in multiple servers
deploy-prod: build-prod ask-confirmation backup-prod
	@echo "Starting deployment production (italy and germany)"
	@set -e; for host in $(PRODUCTION_HOSTS); do \
		echo "Deploying to $$host..."; \
		rsync $(RSYNC_FLAG) dist/ $$host:$(DEPLOY_PATH); \
	done
	@echo "Deployed In Production"

