
type PINCreationParam = {
    uuid: string;
    pin_hash: string;
}

type PINUpdateParam = {
    uuid: string;
    old_pin_hash: string;
    new_pin_hash: string;
}

export {
    PINCreationParam,
    PINUpdateParam
}