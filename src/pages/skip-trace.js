import React, { useState , useEffect} from "react";
// import data from "../public/data.json";
import Router from "next/router";
import { InputWrapper } from "components/forms/input-wrapper";
import { Label } from "components/forms/label";
import { Input } from "components/forms/input";
import { Hint } from "components/forms/hint";

export default function Skiptracename() {
  const [ididata, setididata] = useState('hello');
  const [apiConnection, setapiConnection] = useState('hello')
  // useEffect(() => {
  //   console.log('running')
  
  //   return () => {
      
  //   }
  // }, [])
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
  });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [isloading, setisloading] = useState(true);

  const handleSubmit = async () => {
    const body = {
      firstName: form.firstName,
      lastName: form.lastName,
      city: form.city,
      state: form.state,
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
  // const res = await fetch('http://localhost:3000/api/idicore', {
  //     method: 'POST',
  //     body: JSON.stringify(body)
  // })
  // const data = await res.json()
  // setididata(data.data)
  let promises = [];
  promises.push(
 fetch('/api/user/userSearch', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form)
  }
  )
  )
  Promise.all(promises);
  };
  
  const Name = async () => {
    setisloading(true);
    let promises = [];
    const database = ididata.result[0]
    var data = database.name;
    var i;
    for (i = 0; i < data.length; i++) {
      promises.push(
        fetch("/api/skiptrace", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pid: database.pid,
            first: data[i].first ? data[i].first : "null",
            last: data[i].last ? data[i].last : "null",
            middle: data[i].middle ? data[i].middle : "null",
          }),
        })
      );
    }
    Promise.all(promises);
    Phone();
  };

  const Phone = () => {
    let promises = [];
    const database = ididata.result[0]
    var data = database.phone;
    var i;

    for (i = 0; i < data.length; i++) {
      promises.push(
        fetch("/api/skiptrace/stphone", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pid: database.pid,
            type: data[i].type ? data[i].type : "null",
            number: data[i].number ? data[i].number : "null",
            providername: data[i].providerName ? data[i].providerName : "null",
            firstseen: data[i].meta.firstSeen ? data[i].meta.firstSeen : "null",
            lastseen: data[i].meta.lastSeen ? data[i].meta.lastSeen : "null",
          }),
        })
      );
    }
    Email();
  };

  const Email = () => {
    let promises = [];
    const database = ididata.result[0]
    var data = database.email;
    var i;

    for (i = 0; i < data.length; i++) {
      promises.push(
        fetch("/api/skiptrace/stemail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pid: database.pid,
            email: data[i].data ? data[i].data : "null",
            firstseen: data[i].meta.firstSeen ? data[i].meta.firstSeen : 0,
            lastseen: data[i].meta.lastSeen ? data[i].meta.lastSeen : 0,
          }),
        })
      );
    }
    Address();
  };
  const Address = async () => {
    let promises = [];
    const database = ididata.result[0]
    var data = database.address;
    var i;
    for (i = 0; i < data.length; i++) {
      promises.push(
        fetch("/api/skiptrace/skiptraceaddress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pid: database.pid,
            data: data[i].data ? data[i].data : "null",
            streetNumber: data[i].streetNumber ? data[i].streetNumber : "null",
            street: data[i].street ? data[i].street : "null",
            streetSuffix: data[i].streetSuffix ? data[i].streetSuffix : "null",
            city: data[i].city ? data[i].city : "null",
            state: data[i].state ? data[i].state : "null",
            zip: data[i].zip ? data[i].zip : "null",
            zip4: data[i].zip4 ? data[i].zip4 : "null",
            dateRange: data[i].dateRange ? data[i].dateRange : "null",
            county: data[i].county ? data[i].county : "null",
            latitude: data[i].latitude ? data[i].latitude : 11.11,
            longitude: data[i].longitude ? data[i].longitude : 11.11,
            ownership: data[i].ownership ? data[i].ownership : 'null',
          }),
        })
      );
    }
    Promise.all(promises);
    Relationship();
  };

  const Relationship = () => {
    let promises = [];
    const database = ididata.result[0]
    var relationship = database.relationship;
    var r;
    var n;
    var p;
    for (r = 0; r < relationship.length; r++) {
      const data = relationship[r];
      const first = data.name.first;
      const last = data.name.last;
      const parentpid = database.pid;
      const pid = data.name.pid;
      const type = data.type;
      const subtype = data.subType;
      const dob = data.dob.age;
      const rank = data.meta.rank;
      for (p = 0; p < relationship[r].phone.length; p++) {
        const phone = relationship[r].phone[p];
        //   console.log('name: ' , first, ' number: ', phone.number)
        promises.push(
          fetch("/api/skiptrace/strelationship", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              parentpid: parentpid,
              pid: pid,
              first: first ? first : "null",
              last: last ? last : "null",
              type: type ? type : "null",
              subtype: subtype ? subtype : "null",
              dob: dob ? dob : "null",
              rank: rank ? rank : 0,
              phonenumber: phone.number ? phone.number : "null",
              phonetype: phone.type ? phone.type : "null",
              phoneprovidername: phone.providerName
                ? phone.providerName
                : "null",
              phonefirstseen: phone.meta.firstSeen ? phone.meta.firstSeen : 0,
              phonelastseen: phone.meta.lastSeen ? phone.meta.lastSeen : 0,
            }),
          })
        );
      }
      Promise.all(promises);
    }
    setisloading(false);
  };
  const Property = async () => {
    let promises = [];
    const database = ididata.result[0]
    var data = database.property;
    var i;
    for (i = 0; i < data.length; i++) {
      promises.push(
        fetch("/api/skiptraceaddress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pid: database.pid,
            data: data[i].data ? data[i].data : "null",
            streetNumber: data[i].streetNumber ? data[i].streetNumber : "null",
            street: data[i].street ? data[i].street : "null",
            streetSuffix: data[i].streetSuffix ? data[i].streetSuffix : "null",
            city: data[i].city ? data[i].city : "null",
            state: data[i].state ? data[i].state : "null",
            zip: data[i].zip ? data[i].zip : "null",
            zip4: data[i].zip4 ? data[i].zip4 : "null",
            dateRange: data[i].dateRange ? data[i].dateRange : "null",
            county: data[i].county ? data[i].county : "null",
            latitude: data[i].latitude ? data[i].latitude : "null",
            longitude: data[i].longitude ? data[i].longitude : "null",
            ownership: data[i].ownership ? data[i].ownership : "null",
          }),
        })
      );
    }
    Promise.all(promises);
    changedirection();
  };

  const changedirection = () => {
    Router.push("/data/?pid=" + database.pid);
  };


  

  return (
    <>
              <InputWrapper outerClassName="sm:col-span-4">
            <Label>Label</Label>
            <Input name="name" type="text" />
            <Hint>This is a hint</Hint>
          </InputWrapper>
      <div style={{ padding: "10px" }}>
        <div style={{ paddingBottom: "10px", textDecoration: "underline" }}>
          Skip Trace Name Testing for new application
        </div>
        <button
          onClick={Name}
          style={{
            backgroundColor: "lightblue",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          Save Data
        </button>
        <button
          onClick={Address}
          style={{
            backgroundColor: "lightblue",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          Relationship
        </button>
      </div>
      <div className="md:w-1/2 flex justify-start mt-5 md:justify-end w-full  ">
        <div className="shadow-md flex-auto max-w-sm p-10 pb-20">
          <h1>Skip Trace Search Form</h1>
          <div className="w-full">
            <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
              <span className="text-red-400 mr-1">*</span> First Name
            </div>
            <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
              {" "}
              <input
                name="firstName"
                placeholder="First"
                onChange={handleChange}
                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
              />{" "}
            </div>
          </div>
          <div className="w-full">
            <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
              <span className="text-red-400 mr-1">*</span> Last Name
            </div>
            <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
              {" "}
              <input
                name="lastName"
                onChange={handleChange}
                placeholder="Last Name"
                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
              />{" "}
            </div>
          </div>
          <div className="w-full">
            <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
              <span className="text-red-400 mr-1">*</span> Address
            </div>
            <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
              {" "}
              <input
                name="address"
                placeholder="Address"
                onChange={handleChange}
                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
              />{" "}
            </div>
          </div>
          <div className="w-full">
            <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
              <span className="text-red-400 mr-1">*</span> City
            </div>
            <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
              {" "}
              <input
                name="city"
                onChange={handleChange}
                placeholder="City"
                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
              />{" "}
            </div>
          </div>
          <div className="w-full">
            <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
              <span className="text-red-400 mr-1">*</span> State
            </div>
            <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
              {" "}
              <input
                name="state"
                onChange={handleChange}
                placeholder="State"
                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
              />{" "}
            </div>
          </div>
          <div className="mt-6 relative">
            <button
              onClick={handleSubmit}
              className="shadow-md font-medium py-2 px-4 text-green-100
                  cursor-pointer bg-teal-600 rounded text-lg tr-mt  absolute text-center w-full"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div>
        <h1>{isloading ? "Loading..." : "Finished processing..."}</h1>
      </div>
    </>
  );
}
