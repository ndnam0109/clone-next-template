// import prisma from '../../../../lib/prisma'
export default async function handler(req,res) { 
    const apiUrl = "https://api.idicore.com/search/"
        const body = {
      firstName: "Justin",
      lastName: "Brenner",
      city: "Wayland",
      state: "MI",
      fields: [
        "name",
        "phone",
        "address",
        "email",
        "property",
        "isDead",
        "relationship",
        "dob",
      ],
    };
    try {
        const idi = await fetch("https://api.idicore.com/search/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "",
            },
            body: body,
          });
          const data = await idi.json();
          console.log(data)
          res.status(201).json({ success: true, data: data })
    } catch (error) {
        console.log('error with api call',error)
    }
}