Instructions to run the project.

Running the project locally
## Run App locally -

- git clone https://github.com/afreen77/inventory.git
- Replace the data file(inventory.json) inventory/data/ with your json file
- npm install
- npm run build
- npm run start

## Dockerised App -

- Ensure docker daemon is running on the machine.
- build the target using the following command
  * docker build -t inventory .
- run the docker target as follows
  * docker run -p 3000:3000 inventory
