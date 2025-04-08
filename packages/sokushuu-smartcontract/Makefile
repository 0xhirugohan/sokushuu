# Filter out the target name ('verify') from the command-line goals
# to get the remaining arguments.
ARGS := $(filter-out $@,$(MAKECMDGOALS))

# Extract the first and second word from the remaining arguments.
ARG0 := $(word 1, $(ARGS))
ARG1 := $(word 2, $(ARGS))
ARG2 := $(word 3, $(ARGS))

deploy:
	forge script $(ARG1) --account dev
deploy-broadcast:
	forge script $(ARG1) --account dev --broadcast --skip-simulation

verify:
	@echo "Attempting verification with:"
	@echo "  Arg1 (Address?): $(ARG1)"
	@echo "  Arg2 (Contract Name?): $(ARG2)"
	forge verify-contract \
		--rpc-url https://rpc.open-campus-codex.gelato.digital \
		--verifier blockscout \
		--verifier-url 'https://edu-chain-testnet.blockscout.com/api/' \
		$(ARG1) \
		$(ARG2)

# Declare only the 'verify' target as phony.
# The arguments $(ARGS) are handled by variable assignment and don't need to be phony.
.PHONY: verify
