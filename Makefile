# Variables
LOCAL_HOST         = mattia@127.0.0.1
TEST_HOST          = mattia@192.168.1.99
PROD_HOST    	   = mattia@192.168.1.100
PROD_HOST_FALLBACK = root@159.69.159.185
REMOTE_DEPLOY_PATH = stack-structure/data/landing-page
PRODUCTION_HOSTS   = $(PROD_HOST) $(PROD_HOST_FALLBACK)

RSYNC_FLAG := -azP --delete --exclude '.gitkeep'
MAX_BACKUPS = 1
TIMESTAMP  := $(shell date '+%Y-%m-%d_h%H:%M')

.PHONY:  backup-prod deploy-prod ask-confirmation

# Testing procedures

build-local:
	@vite build --mode development	

build-staging:
	@vite build --mode staging	

build-prod:
	@vite build --mode production	

# Backup procedures

define backup
	@echo "Backing up $(1)..."; \
	ssh $(1) "mkdir -p $(REMOTE_DEPLOY_PATH) && \
	          cp -r $(REMOTE_DEPLOY_PATH) $(REMOTE_DEPLOY_PATH).bak.$(TIMESTAMP) && \
	          ls -1d $(REMOTE_DEPLOY_PATH).* 2>/dev/null | sort | head -n -$(MAX_BACKUPS) | xargs -r rm -rf"
endef

backup-local:
	$(call backup,$(LOCAL_HOST))

backup-staging:
	$(call backup,$(TEST_HOST))

backup-prod:
	$(call backup,$(PROD_HOST))
	$(call backup,$(PROD_HOST_FALLBACK))

# Deployment procedures

ask-confirmation:
	@read -p 'Are you sure you want to deploy to PRODUCTION? (y/N) ' ans; \
	if [ "$$ans" != "y" ]; then \
		echo "Aborted."; exit 1; \
	fi

deploy-local: build-local backup-local
	rsync -azP --delete dist/ $(LOCAL_HOST):$(REMOTE_DEPLOY_PATH)	

deploy-staging: build-staging backup-staging
	@echo "Starting deployment staging"
	rsync $(RSYNC_FLAG) dist/ $(TEST_HOST):$(REMOTE_DEPLOY_PATH)	
	@echo "DEPLOYED STAGING"

# Deploys in multiple servers
deploy-prod: build-prod ask-confirmation backup-prod
	@echo "Starting deployment production (italy and germany)"
	@set -e; for host in $(PRODUCTION_HOSTS); do \
		echo "Deploying to $$host..."; \
		rsync $(RSYNC_FLAG) dist/ $$host:$(REMOTE_DEPLOY_PATH); \
	done
	@echo "Deployed In Production"

