# [NearX's Optimism Hackathon](https://nearx.notion.site/Hackathon-Optimism-NearX-21124cc4067042cc95bc1c2434322faf)
Sibyl is a smart contract Oracle that provides data to arbitrary questions, powered by AI LLM's.

# Setup
## Prerequisites
 Essential tools
- Docker and Docker Compose
- An OpenAI API key ([link](https://platform.openai.com/api-keys))
- An Optimism RPC URL

Optional (for contract development)
- Foundry

## Setting up environment variables
1. Generate a `backend/.env` file from the `backend/.env.example` template
```bash
cp backend/.env.example backend/.env
```
2. Edit the newly created `backend/.env` file and configure the required variables.

## Starting the Project
Run `docker-compose up` at the root project directory to easily start the backend and frontend services.
You can access the frontend at `http://localhost:3000`.

To facilitate judging, the contract has been deployed to the Optimism Sepolia Testnet at the address. Lucas (address: 0x7824A63A4051eB44723AAae83398c847e51187FA) has ownership, complete access control management capabilities, and was assigned the AI Data Provider role. For any necessary redeployments, use the forge tool from Foundry.

```bash
forge create --rpc-url $OPTIMISM_SEPOLIA_RPC_URL --private-key 0x1234567890123456789012345678901234567890 src/Sibyl.sol:Sibyl
```