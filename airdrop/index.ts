const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js")

const wallet = new Keypair()

const publicKey = new PublicKey(wallet._keypair.publicKey)
const secretKey = wallet._keypair.secretKey

console.log("pub", publicKey, "sec", secretKey)

//const conn = new Connection(clusterApiUrl('devnet'), 'confirmed')

const getWalletBalance = async() => {
    try {
        const conn = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const balance = await conn.getBalance(publicKey)
        console.log(`balance ${balance}`)
    } catch (error) {
        console.error(error)
    }
}

const airDrop = async() => {
    try {
        const conn = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const fromSignature = await conn.requestAirdrop(publicKey, 2*LAMPORTS_PER_SOL)
        await conn.confirmTransaction(fromSignature)
    } catch (error) {
        console.error(error)
    }
}

const main = async() => {
    await airDrop()
    await getWalletBalance()
}

main()