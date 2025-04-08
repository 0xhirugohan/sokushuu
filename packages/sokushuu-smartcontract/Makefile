deploy:
	forge script script/Counter.s.sol --account dev
deploy-broadcast:
	forge script script/Counter.s.sol --account dev --broadcast --skip-simulation

# Filter out the target name ('verify') from the command-line goals
# to get the remaining arguments.
ARGS := $(filter-out $@,$(MAKECMDGOALS))

# Extract the first and second word from the remaining arguments.
ARG0 := $(word 1, $(ARGS))
ARG1 := $(word 2, $(ARGS))
ARG2 := $(word 3, $(ARGS))

verify:
	@echo "Attempting verification with:"
	@echo "  Arg0 (Address?): $(ARG0)"
	@echo "  Arg1 (Contract Name?): $(ARG1)"
	forge verify-contract \
		--chain-id 656476 \
		--num-of-optimizations 1000000 \
		--watch \
		--constructor-args "constructor()" \
		$(ARG1) \
		$(ARG2)

# Declare only the 'verify' target as phony.
# The arguments $(ARGS) are handled by variable assignment and don't need to be phony.
.PHONY: verify
