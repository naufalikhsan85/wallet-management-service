import { create } from "../accessors/accountsClient/accounts.accessors"
import { generateAlphanumericCode } from "../utils/main.utils"


const generateInternal =  async(user_id: number) =>{
    const newPrivKey = generateAlphanumericCode(16, 8)
    const newPubKey = ""

    await create({
        priv_key: newPrivKey,
        pub_key: newPubKey,
        wallet_type: 1,
        user_id: user_id
    })
}

