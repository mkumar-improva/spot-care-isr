import { Config } from "@/constants/config";

export const END_POINT = {
  get: async (
    path: string,
    params: any = undefined,
    version: string = "V1"
  ) => {
    try {
      var basePath = version === "V2" ? Config.URL.API_V2 : Config.URL.API_URL;
      var url = new URL(`${basePath}${path}`);

      if (params) {
        Object.keys(params).forEach((key) =>
          url.searchParams.append(key, params[key])
        );
      }

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return await response.json();
    } catch (error) {
      console.error("Error fetching:", error);
    }
  },
  post: async (
    path: string,
    body: any,
    stringfy: boolean = false,
    version: string = "V1"
  ) => {
    try {
      var basePath = version === "V2" ? Config.URL.API_V2 : Config.URL.API_URL;
      var url = new URL(`${basePath}${path}`);
      const response = await fetch(url.toString(), {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: stringfy ? JSON.stringify(body) : body,
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching :", error);
    }
  },
  postFormData: async (path: string, body: any, version: string = "V1") => {
    try {
      var basePath = version === "V2" ? Config.URL.API_V2 : Config.URL.API_URL;
      var url = new URL(`${basePath}${path}`);
      const response = await fetch(url.toString(), {
        method: "POST",
        body: body,
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching :", error);
    }
  },
  Delete: async (path: string, body: any, version: string = "V1") => {
    var basePath = version === "V2" ? Config.URL.API_V2 : Config.URL.API_URL;
    var url = new URL(`${basePath}${path}`);
    const response = await fetch(url.toString(), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  },
  PUT: async (
    path: string,
    body: any,
    stringify: boolean,
    version: string = "V1"
  ) => {
    var basePath = version === "V2" ? Config.URL.API_V2 : Config.URL.API_URL;
    var url = new URL(`${basePath}${path}`);
    const response = await fetch(url.toString(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: stringify ? JSON.stringify(body) : body,
    });
    return await response.json();
  },
  getIpAddress: async () => {
    try {
      var url = new URL(
        `${Config.URL.IP_FINDER_V2}?key=${Config.KEY.IP_FINDER_V2_API_KEY}`
      );
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching :", error);
    }
  },
};
