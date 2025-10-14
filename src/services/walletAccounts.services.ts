import { PrismaClient } from "@prisma/accounts-client";

const prisma = new PrismaClient();

interface CreateAccountParams {
    user_uuid: string;      
    pub_key: string;
    priv_key: string;
    wallet_type_description: string;
}

export async function createAccount({
    user_uuid,
    pub_key,
    priv_key,
    wallet_type_description,
}: CreateAccountParams) {
    try {
        const user = await prisma.active_users.findUnique({
            where: { uuid: user_uuid },
        });
        if (!user) {
            throw new Error(`Active user with uuid ${user_uuid} not found`);
        }

        const walletType = await prisma.wallet_types.findUnique({
            where: { description: wallet_type_description },
        });
        if (!walletType) {
            throw new Error(`Wallet type '${wallet_type_description}' not found`);
        }

        const newAccount = await prisma.accounts.create({
            data: {
                user_id: user.id,
                pub_key,
                priv_key,
                wallet_type: walletType.id,
            },
            include: {
                active_users: true,
                wallet_types: true,
            },
        });

        return newAccount;
    } catch (error) {
        console.error("Error creating account:", error);
        throw error;
    }
}
