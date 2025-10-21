const handleError = (error: any, context: string): never => {
    console.error(`${context} - Error:`, error);

    // Check if the error has a response (e.g., Axios error)
    if (error.response) {
        const status = error.response.status;
        
        // Customize messages based on status codes
        if (status === 400) {
            throw new Error("Bad request. Please verify your input and try again");
        } else if (status === 401) {
            throw new Error("Unauthorized. Please check your credentials");
        } else if (status === 404) {
            throw new Error("Resource not found");
        } else if (status === 500) {
            throw new Error("Internal server error. Please try again later");
        } else {
            throw new Error("An unexpected error occurred. Please try again");
        }
    } else if (error.request) {
        // Network-related or request-related error
        throw new Error("Network error. Please check your connection and try again");
    } else {
        // Other errors
        throw new Error(error.message);
    }
};

export default handleError;