const { createClient } = require("@supabase/supabase-js");
const config = require("../../utils/config");
const groupRouter = require("express").Router();
const supabase = require("../../utils/supabase");

groupRouter.get("/", async (req, res) => {
  const { data, error } = await supabase.from("calendar_group").select(`
            *,
            calendar (
                *,
                selected_slots (
                    *
                )
            )
        `);

  return res.json(data);
});

module.exports = groupRouter;
