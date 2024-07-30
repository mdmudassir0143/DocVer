import logging
import base64
import algokit_utils
from algosdk.v2client.algod import AlgodClient
from algosdk.v2client.indexer import IndexerClient

logger = logging.getLogger(__name__)

# define deployment behaviour based on supplied app spec
def deploy(
    algod_client: AlgodClient,
    indexer_client: IndexerClient,
    app_spec: algokit_utils.ApplicationSpecification,
    deployer: algokit_utils.Account,
) -> None:
    from smart_contracts.artifacts.hello_world.hello_world_client import (
        HelloWorldClient,
    )

    account = algokit_utils.get_account_from_mnemonic(
        "entry fluid orphan steel pink foster suffer violin wasp shy rib rapid age excess nest salon cube pear cactus trophy winner afraid student able armed"
    )

    algod_client = algokit_utils.get_algod_client(
        # algokit_utils.AlgoClientConfig("https://mainnet-api.algonode.cloud", "a" * 64)
        algokit_utils.AlgoClientConfig(
            "https://testnet-api.algonode.cloud",
            "a" * 64,
        )
        # algokit_utils.AlgoClientConfig("http://143.110.182.20:4190","02652eff1e5c6cd866bbb70e928b2b2438e4422070574fc608000fc55e15bd6f")
    )

    deployer = account

    app_client = HelloWorldClient(
        algod_client,
        creator=deployer,
        indexer_client=indexer_client,
    )

    app_client.deploy(
        on_schema_break=algokit_utils.OnSchemaBreak.AppendApp,
        on_update=algokit_utils.OnUpdate.AppendApp,
    )

    dochash = "603cf02416dc96bfcc3fb904f656fc4b617bf8eb6ded02d787fc939d9a7b7ae8"

    response = app_client.adddochash(dochash=dochash)
    logger.info(
        f"Called Dochash on {app_spec.contract.name} ({app_client.app_id}) "
        f"with name={dochash}, received: {response.return_value}"
        f"Transaction ID ={response.tx_id}"
    )

    # API to call receive the data from Blockchain using the Trasaction ID
    # https://testnet-idx.algonode.cloud/v2/transactions?txid=NVX6J6OSZXS334RJHJCK3EJPYACYEUIVY6YSQ4KJK4B7FWAPRIFQ
