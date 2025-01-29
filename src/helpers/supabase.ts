import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://auth.modelun.org",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16bHZqdHZycmtxeWh1dWJpdmVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4OTY4NTEsImV4cCI6MjAxMjQ3Mjg1MX0.iqoIXz9HNhY281QOZ6Ss5UtILrIvr6md_GIQrk4buzk"
);

async function delQueries(del: any) {
  try {
    const seatsRes = await supabase
      .from("seats")
      .select("committee_id, delegate_id")
      .eq("delegate_id", del.id);

    if (!seatsRes.data || seatsRes.data.length === 0) {
      console.error("No seats found for this delegate");
      return false;
    }

    const committeeRes = await supabase
      .from("committees")
      .select("name, organ")
      .eq("id", seatsRes.data[0].committee_id);

    if (committeeRes.data && committeeRes.data.length > 0) {
      const committee = committeeRes.data[0].name;
      const organ = committeeRes.data[0].organ;
      return { committee, organ };
    } else {
      console.error("No committee found for this seat");
      return false;
    }
  } catch (error) {
    console.error("Error querying data:", error);
    return false;
  }
}

export async function delLookup(name: string) {
  if (name.split(" ").length === 1) {
    return false;
  }

  const splitName = name.split(" ");
  const firstName = splitName[0];
  const lastName = splitName[splitName.length - 1];

  let query = supabase.from("delegates").select("first_name, last_name, id");
  if (lastName.length === 1) {
    query
      .like("first_name", `%${firstName.slice(1)}%`)
      .like("last_name", `%${lastName}%`);
  }
  query
    .like("first_name", `%${firstName.slice(1)}%`)
    .like("last_name", `%${lastName.slice(1)}%`);

  const res = await query;

  if (res.data) {
    const possibleDels = res.data;

    if (possibleDels.length === 0) {
      return false;
    } else if (possibleDels.length === 1) {
      const res2 = await delQueries(possibleDels[0]);
      if (res2) {
        return res2;
      }
      return possibleDels[0];
    } else if (possibleDels.length > 1) {
      if (
        possibleDels.filter((del) => del.first_name === firstName).length === 1
      ) {
        delQueries(
          possibleDels.filter((del) => del.first_name === firstName)[0]
        ).then((res) => {
          return res;
        });
      } else if (
        possibleDels.filter((del) => del.last_name === lastName).length === 1
      ) {
        delQueries(
          possibleDels.filter((del) => del.last_name === lastName)[0]
        ).then((res) => {
          return res;
        });
      } else if (
        possibleDels.filter(
          (del) => del.first_name === firstName && del.last_name === lastName
        ).length === 1
      ) {
        delQueries(
          possibleDels.filter(
            (del) => del.first_name === firstName && del.last_name === lastName
          )[0]
        ).then((res) => {
          return res;
        });
      } else {
        let searchName = name.toLowerCase();
        let otherMatch: {
          first_name: string | null;
          last_name: string | null;
          id: string | null;
        } = { first_name: null, last_name: null, id: null };
        searchName = searchName.replace(/[^a-zA-Z0-9]/g, "");
        possibleDels.forEach((del) => {
          let delName = `${del.first_name} ${del.last_name}`;
          delName = delName.toLowerCase();
          delName = delName.replace(/[^a-zA-Z0-9]/g, "");
          if (delName === searchName) {
            delQueries(del).then((res) => {
              return res;
            });
          } else if (
            delName.includes(name.toLowerCase().split(" ")[0]) &&
            !otherMatch.id
          ) {
            otherMatch = del;
          }
        });
        if (otherMatch.id) {
          delQueries(otherMatch).then((res) => {
            return res;
          });
        }
      }
      return false;
    }
  } else {
    return false;
  }
}
