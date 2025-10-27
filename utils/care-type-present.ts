import { Cares } from "types/care-types"

const careTypePresent = (input: string, cares: Cares[]) => {
    return cares.some((group) => group.careTypes.includes(input))
}

export default careTypePresent