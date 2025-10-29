import { PhoneNumber, Providers } from "@/types/provider-details";

export const upsertClaimedProvider = (
  providers: Providers[],
  newProviderData: any,
  status: string = "pending"
): Providers[] => {
  const updatedProvider: Providers = {
    id: newProviderData.id,
    code: newProviderData.code,
    name: newProviderData.name,
    phone: newProviderData.phone || "",
    email: newProviderData.email || "",
    description: newProviderData.description || "",
    services: newProviderData.services || [],
    tags: newProviderData.tags || [],
    isSponsored: newProviderData.isSponsored || false,
    isActive:
      newProviderData.isActive !== undefined ? newProviderData.isActive : true,
    isEmailVerified: false,
    locations: [],
    rating: null,
    images: [],
    totalReview: {
      id: 0,
      totalRating: "0",
      totalReviews: "0",
      review: [],
    },
    phoneNumber: [],
    status: status,
    isRatingsAvailable: false,
    section: [],
    business:{
      identityCompleted: false,
      servicesCompleted: false,
      locationCompleted: false,
      contactCompleted: false,
    }
  };

  const index = providers.findIndex((p) => p.code === newProviderData.code);
  if (index !== -1) {
    const existing = providers[index];
    const mergedProvider = {
      ...existing,
      ...updatedProvider,
      locations: existing.locations || [],
      images: existing.images || [],
      phoneNumber: existing.phoneNumber || [],
    };
    const copy = [...providers];
    copy[index] = mergedProvider;
    return copy;
  }

  return [...providers, updatedProvider];
};

export const updateProviderImage = (
  providers: Providers[],
  providerCode: string,
  newImage: any
): Providers[] => {
  const index = providers.findIndex((p) => p.code === providerCode);
  if (index === -1) return providers; // Provider not found, do nothing

  const provider = providers[index];
  const existingImages = provider.images || [];

  // Check if the image with same ID exists
  const imageIndex = existingImages.findIndex(
    (img: any) => img.id === newImage.id
  );

  let updatedImages;
  if (imageIndex !== -1) {
    // Replace existing image
    updatedImages = [...existingImages];
    updatedImages[imageIndex] = newImage;
  } else {
    // Add new image
    updatedImages = [...existingImages, newImage];
  }

  const updatedProvider = {
    ...provider,
    images: updatedImages,
  };

  const updatedProviders = [...providers];
  updatedProviders[index] = updatedProvider;

  return updatedProviders;
};

export const updateProviderServices = (
  providers: Providers[],
  providerCode: string,
  newServices: string[]
): Providers[] => {
  const index = providers.findIndex((p) => p.code === providerCode);
  if (index === -1) return providers; // Provider not found

  const updatedProvider = {
    ...providers[index],
    services: newServices,
  };

  const updatedProviders = [...providers];
  updatedProviders[index] = updatedProvider;

  return updatedProviders;
};

export const updateProviderLocation = (
  providers: Providers[],
  providerCode: string,
  newLocation: any
): Providers[] => {
  const index = providers.findIndex((p) => p.code === providerCode);
  if (index === -1) return providers; // Provider not found

  const provider = providers[index];
  const existingLocations = provider.locations || [];

  const locationIndex = existingLocations.findIndex(
    (loc: any) => loc.id === newLocation.id
  );

  let updatedLocations;
  if (locationIndex !== -1) {
    // Update existing location
    updatedLocations = [...existingLocations];
    updatedLocations[locationIndex] = newLocation;
  } else {
    // Add new location
    updatedLocations = [...existingLocations, newLocation];
  }

  const updatedProvider = {
    ...provider,
    locations: updatedLocations,
  };

  const updatedProviders = [...providers];
  updatedProviders[index] = updatedProvider;

  return updatedProviders;
};

export const updateProviderPhoneNumber = (
  providers: Providers[],
  providerCode: string,
  phoneData: PhoneNumber
): Providers[] => {
  const index = providers.findIndex((p) => p.code === providerCode);
  if (index === -1) return providers; // Provider not found

  const provider = providers[index];
  const existingPhones: PhoneNumber[] = provider.phoneNumber || [];

  // Ensure isVerified is true
  const updatedPhone: PhoneNumber = {
    ...phoneData,
    isVerified: true,
  };

  const phoneIndex = existingPhones.findIndex((p) => p.id === updatedPhone.id);

  let updatedPhoneList: PhoneNumber[];
  if (phoneIndex !== -1) {
    updatedPhoneList = [...existingPhones];
    updatedPhoneList[phoneIndex] = updatedPhone;
  } else {
    updatedPhoneList = [...existingPhones, updatedPhone];
  }

  const phoneString = updatedPhoneList.map((p) => p.phoneNumber).join(", ");

  const updatedProvider = {
    ...provider,
    phoneNumber: updatedPhoneList,
    phone: phoneString,
  };

  const updatedProviders = [...providers];
  updatedProviders[index] = updatedProvider;

  return updatedProviders;
};

export const updateProviderEmail = (
  providers: Providers[],
  providerCode: string,
  emailResponse: any
): Providers[] => {
  const updatedList = providers.map((provider) =>
    provider.code === providerCode
      ? { ...provider, email: emailResponse.email }
      : provider
  );
  return updatedList;
};

export const removeProviderImage = (
  providers: Providers[],
  providerCode: string,
  imagePathToRemove: string
): Providers[] => {
  const index = providers.findIndex((p) => p.code === providerCode);
  if (index === -1) return providers; // Provider not found

  const provider = providers[index];
  const existingImages = provider.images || [];

  const updatedImages = existingImages.filter(
    (img) => img.imagePath !== imagePathToRemove
  );

  const updatedProvider = {
    ...provider,
    images: updatedImages,
  };

  const updatedProviders = [...providers];
  updatedProviders[index] = updatedProvider;

  return updatedProviders;
};

export const removeProviderLocation = (
  providers: Providers[],
  providerCode: string,
  addressId: number
): Providers[] => {
  const index = providers.findIndex((p) => p.code === providerCode);
  if (index === -1) return providers; // Provider not found

  const provider = providers[index];
  const existingLocations = provider.locations || [];

  const updatedLocations = existingLocations.filter(
    (loc) => loc.id !== addressId
  );

  const updatedProvider = {
    ...provider,
    locations: updatedLocations,
  };

  const updatedProviders = [...providers];
  updatedProviders[index] = updatedProvider;

  return updatedProviders;
};

export const removeProviderService = (
  providers: Providers[],
  providerCode: string,
  serviceName: string
): Providers[] => {
  const index = providers.findIndex((p) => p.code === providerCode);
  if (index === -1) return providers; // Provider not found

  const provider = providers[index];
  const existingServices = provider.services || [];

  const updatedServices = existingServices.filter(
    (service) => service !== serviceName
  );

  const updatedProvider = {
    ...provider,
    services: updatedServices,
  };

  const updatedProviders = [...providers];
  updatedProviders[index] = updatedProvider;

  return updatedProviders;
};

export const removeProviderPhoneNumber = (
  providers: Providers[],
  providerCode: string,
  phoneNumberId: number
): Providers[] => {
  const index = providers.findIndex((p) => p.code === providerCode);
  if (index === -1) return providers; // Provider not found

  const provider = providers[index];
  const existingPhones = provider.phoneNumber || [];

  const updatedPhoneList = existingPhones.filter(
    (phone) => phone.id !== phoneNumberId
  );

  const updatedPhoneString = updatedPhoneList
    .map((p) => p.phoneNumber)
    .join(", ");

  const updatedProvider = {
    ...provider,
    phoneNumber: updatedPhoneList,
    phone: updatedPhoneString,
  };

  const updatedProviders = [...providers];
  updatedProviders[index] = updatedProvider;

  return updatedProviders;
};

export const setPrimaryProviderPhoneNumber = (
  providers: Providers[],
  providerCode: string,
  phoneNumberId: number
): Providers[] => {
  const index = providers.findIndex((p) => p.code === providerCode);
  if (index === -1) return providers; // Provider not found

  const provider = providers[index];
  const existingPhones = provider.phoneNumber || [];

  const updatedPhoneList = existingPhones.map((phone) => ({
    ...phone,
    primary: phone.id === phoneNumberId,
  }));

  const updatedPhoneString = updatedPhoneList
    .map((p) => p.phoneNumber)
    .join(", ");

  const updatedProvider = {
    ...provider,
    phoneNumber: updatedPhoneList,
    phone: updatedPhoneString,
  };

  const updatedProviders = [...providers];
  updatedProviders[index] = updatedProvider;

  return updatedProviders;
};

export const updateProviderBusinessCompletion = (
  providers: Providers[],
  providerCode: string,
  completionField: 'identityCompleted' | 'servicesCompleted' | 'locationCompleted' | 'contactCompleted',
  isCompleted: boolean
): Providers[] => {
  const index = providers.findIndex((p) => p.code === providerCode);
  if (index === -1) return providers; // Provider not found

  const provider = providers[index];
  const existingBusiness = provider.business || {
    identityCompleted: false,
    servicesCompleted: false,
    locationCompleted: false,
    contactCompleted: false,
  };

  const updatedBusiness = {
    ...existingBusiness,
    [completionField]: isCompleted,
  };

  const updatedProvider = {
    ...provider,
    business: updatedBusiness,
  };

  const updatedProviders = [...providers];
  updatedProviders[index] = updatedProvider;

  return updatedProviders;
};

export const removeClaimedProvider = (
  providers: Providers[],
  providerCode: string
): Providers[] => {
  return providers.filter((provider) => provider.code !== providerCode);
};

export const updateProviderName = (
  providers: Providers[],
  providerCode: string,
  newName: string
): Providers[] => {
  const index = providers.findIndex((p) => p.code === providerCode);
  if (index === -1) return providers; // Provider not found

  const updatedProvider = {
    ...providers[index],
    name: newName,
  };

  const updatedProviders = [...providers];
  updatedProviders[index] = updatedProvider;

  return updatedProviders;
};