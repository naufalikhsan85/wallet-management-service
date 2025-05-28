type CreatePIN = {
  user_id: number;
  pin_hash: string;
  salt: string;
};

type UpdatePIN = CreatePIN &{
    max_try: number;
    num_tried: number;
}

export {
    CreatePIN,
    UpdatePIN
}