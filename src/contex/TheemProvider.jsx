import { createContext, useContext, useState, useEffect } from "react";
import authService from "../service/authService";
import profileDatabas from "../service/profileDatabase";
import chefDatabase from "../service/chefDatabase";
import aboutDatabase from "../service/aboutDatabase";
import addressDatabase from "../service/addressDatabase";
import settingDatabase from "../service/settingDatabase";
export const TheemContex = createContext();
const TheemProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(false);
  const [authInfo, setAuthInfo] = useState([]);
  const [imageId, setImageId] = useState(false);
  const [chef, setChef] = useState([]);
  const [load, SetLoad] = useState([]);
  const [contact, setContact] = useState([]);
  const [singleContact, setSingleContact] = useState([]);
  const [setting, setSetting] = useState([])
  const fatch = async () => {
    const userData = await authService.getAccount();
    let profileData = await profileDatabas.listQuery(userData.$id);
    setImageId(profileData?.documents[0]?.imageId ?? null);
    setAuthInfo(userData);
  };

  useEffect(() => {
    const getData = localStorage.getItem("authUser");
    if (getData) {
      setAuth(true);
    }
    fatch();
  }, []);
  useEffect(() => {
    const about = async () => {
      const set = await aboutDatabase.listQuery();
      SetLoad(set);
    };
    about();
  }, []);
  useEffect(() => {
    const getData = async () => {
      const res = await chefDatabase.queryChif();
      setChef(res.documents);
    };

    getData();
  }, []);

  // console.log(singleContact['Address'].title1)

  useEffect(() => {
    const fatchData = async () => {
      const list = await addressDatabase.listPost();
      let prepard = list.documents.reduce((setData, data) => {
        setData[data.name.trim()] = data;
        return setData;
      }, {});
      
      setSingleContact(prepard)
    
      setContact(list.documents);
    };
    fatchData();
  }, []);
  useEffect(() => {
  const logo = async () =>{
    const sent = await settingDatabase.listQuery()
    setSetting(sent)  
  }
  logo();
  }, [])
  
   
  let dataList = {
    isAuth,
    setAuth,
    authInfo,
    imageId,
    setImageId,
    fatch,
    chef,
    load,
    contact,
    singleContact,
    setting,
  };
  return (
    <TheemContex.Provider value={dataList}>{children}</TheemContex.Provider>
  );
};
export default TheemProvider;

export function useTheme() {
  return useContext(TheemContex);
}
