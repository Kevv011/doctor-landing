export type LandingBusinessHour = {
    label: string;
    opens_at: string | null;
    closes_at: string | null;
    special_text: string | null;
    sort_order: number;
};

export type LandingBusinessSocialLink = {
    platform: string;
    label: string | null;
    url: string;
    sort_order: number;
};

export type LandingBusiness = {
    profile: {
        name: string;
        email: string | null;
        phone: string | null;
        appointment_phone: string | null;
        address: string | null;
        google_maps_url: string | null;
        latitude: string | null;
        longitude: string | null;
        hero_video_url: string | null;
    };
    hours: LandingBusinessHour[];
    social_links: LandingBusinessSocialLink[];
};
