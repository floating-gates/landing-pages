# Variables
REMOTE_HOST          = mattia@192.168.1.14
REMOTE_HOST_FALLBACK = root@159.69.159.185

REMOTE_TEST_DEPLOY_PATH = html-pages/landing-page/staging
REMOTE_PROD_DEPLOY_PATH = html-pages/landing-page/prod

RSYNC_FLAG := -azP --delete --exclude '.gitkeep'
MAX_BACKUPS = 1
TIMESTAMP  := $(shell date '+%Y-%m-%d_h%H:%M')

.PHONY:  backup-staging backup-prod deploy-staging deploy-prod ask-confirmation build-local build-staging build-prod

# Testing procedures

build-local:
	@vite build --mode development    

build-staging:
	@vite build --mode staging    

build-prod:
	@vite build --mode production    

# Backup procedures
# $(1) = Path, $(2) = Host
define backup
	@echo "Backing up $(1) on $(2)..."; \
	ssh $(2) "mkdir -p $(1) && \
	          cp -r $(1) $(1).bak.$(TIMESTAMP) && \
	          ls -1d $(1).bak.* 2>/dev/null | sort | head -n -$(MAX_BACKUPS) | xargs -r rm -rf"
endef

backup-staging:
	$(call backup,$(REMOTE_TEST_DEPLOY_PATH),$(REMOTE_HOST))

backup-prod:
	$(call backup,$(REMOTE_PROD_DEPLOY_PATH),$(REMOTE_HOST))
	$(call backup,$(REMOTE_PROD_DEPLOY_PATH),$(REMOTE_HOST_FALLBACK))

# Deployment procedures

ask-confirmation:
	@read -p 'Are you sure you want to deploy to PRODUCTION? (y/N) ' ans; \
	if [ "$$ans" != "y" ]; then \
	    echo "Aborted."; exit 1; \
	fi

# $(1) = Host, $(2) = Path
define deploy
	@echo "Deploying to $(1)..."
	@rsync $(RSYNC_FLAG) dist/ $(1):$(2)
	@echo "Done → $(1):$(2)"
endef

# -----------------------------------------------------------------------
# Deploy
# -----------------------------------------------------------------------

# deploy-local - is not necessary, webserver can point directly to ./dist
deploy-local: build-local

deploy-staging: build-staging backup-staging
	$(call deploy,$(REMOTE_HOST),$(REMOTE_TEST_DEPLOY_PATH))

deploy-prod: ask-confirmation build-prod backup-prod
	$(call deploy,$(REMOTE_HOST),$(REMOTE_PROD_DEPLOY_PATH))
	$(call deploy,$(REMOTE_HOST_FALLBACK),$(REMOTE_PROD_DEPLOY_PATH))
	@echo "Production deployment complete."
