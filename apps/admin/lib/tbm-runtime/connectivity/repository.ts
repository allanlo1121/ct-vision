import { createClient } from "@workspace/supabase/server"

import { assertNoError } from "@workspace/supabase/errors"
import { TbmCode } from "@workspace/shared"

import {
    type TbmConnectivityRepository,
    type TbmConnectivity,
    tbmConnectivitySchema
} from "@workspace/tbm/runtime"



export const tbmConnectivityRepository: TbmConnectivityRepository = {
    async findByTbmCode(tbmCode: TbmCode): Promise<TbmConnectivity | null> {
        const supabase = await createClient()

        const { data, error } = await supabase
            .schema("tbm")
            .from("connection_status")
            .select("*")
            .eq("tbm_code", tbmCode)
            .maybeSingle()

        assertNoError(error)

        return data ? tbmConnectivitySchema.parse(data) : null
    },

    async listAll(): Promise<TbmConnectivity[]> {
        const supabase = await createClient()


        const { data, error } = await supabase
            .schema("tbm")
            .from("connection_status")
            .select("*")
            .order("updated_at", { ascending: false })

        assertNoError(error)

        return data ?? []

    },

    async delete(tbmCode: TbmCode): Promise<void> {
        const supabase = await createClient()

        const { error } = await supabase
            .schema("tbm")
            .from("connection_status")
            .delete()
            .eq("tbm_code", tbmCode)

        assertNoError(error)
    },
}
