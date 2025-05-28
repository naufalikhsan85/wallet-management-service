import { RegisterParam } from "./registration.types"

type AuthRegisterParam = RegisterParam & {
    useFor: string;
}

export {
    AuthRegisterParam
}