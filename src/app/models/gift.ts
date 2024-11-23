export interface gift {
    giftId: string;
    name: string;
    description: string;
    category: string;
    subcategory: string;
    price: string;
    availability: boolean;
    quantity: number;
}

export interface addGift {
    giftId?: string;
    name: string;
    description: string;
    category: string;
    subcategory: string;
    price: number;
    availability: boolean;
    imageSrc:'';
}