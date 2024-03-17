import React, { useContext, useEffect, useState } from "react";

// UserContext oluşturuluyor
const UserContext = React.createContext();

// UserProvider bileşeni oluşturuluyor
const UserProvider = ({ children }) => {
  // userState adında bir state oluşturuluyor ve useState hook'u kullanılarak başlangıç değeri veriliyor
  const [userState, setUserState] = useState({
    Namık: true,
    Eda: true,
    Suzan: true,
    Engin: true,
    Samet: true
  });

  // UserContext.Provider bileşeni, userState ve setUserState değerlerini içeren bir context sağlar.
  // Bu context, alt bileşenler tarafından kullanılabilir.
  return (
    <UserContext.Provider value={{ userState, setUserState }}>
      {children}
    </UserContext.Provider>
  );
};

// User bileşeni oluşturuluyor
const User = ({ name, online }) => {
  // Kullanıcı adını ve çevrimiçi durumunu temsil eden bir bileşen oluşturuluyor.
  // Flex layout kullanılarak bileşenler yatay olarak hizalanıyor.
  // Çevrimiçi durumuna göre uygun bir emoji gösteriliyor.
  return (
    <div className="flex justify-center items-center border p-2 mb-2">
      <span className="mr-2">{name}:</span>
      <span>{online ? "🟢" : "🔴"}</span>
    </div>
  );
};

// App bileşeni
function App() {
  // UserProvider bileşeni, UserList bileşenine iç içe geçmiş olarak kullanılıyor.
  // Bu, UserList bileşeninin User bileşenlerine UserContext aracılığıyla erişebilmesini sağlar.
  return (
    <UserProvider>
      <UserList />
    </UserProvider>
  );
}

// UserList bileşeni
const UserList = () => {
  // useContext hook'u kullanılarak UserContext'ten userState ve setUserState değerleri alınıyor.
  const { userState, setUserState } = useContext(UserContext);

  // useEffect hook'u kullanılarak her 2 saniyede bir bir kullanıcının durumu değiştiriliyor.
  // setInterval fonksiyonu kullanılarak belirli bir aralıkta işlem gerçekleştiriliyor.
  useEffect(() => {
    const interval = setInterval(() => {
      // Rastgele bir kullanıcı seçiliyor.
      const users = Object.keys(userState);
      const randomUser = users[Math.floor(Math.random() * users.length)];

      // Seçilen kullanıcının durumu tersine çevriliyor.
      setUserState(prevState => ({
        ...prevState,
        [randomUser]: !prevState[randomUser]
      }));
    }, 2000);

    // setInterval fonksiyonunun sonlanması için clearInterval kullanılıyor.
    // Böylece bileşen sonlandığında gereksiz işlem yapılmasının önüne geçilmiş oluyor.
    return () => clearInterval(interval);
  }, [userState, setUserState]);

  // userState içindeki her kullanıcı için bir User bileşeni oluşturuluyor.
  // Oluşturulan User bileşenleri bir div içerisine yerleştiriliyor ve sayfada listeleniyor.
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        {Object.entries(userState).map(([name, online]) => (
          <User key={name} name={name} online={online} />
        ))}
      </div>
    </div>
  );
};

export default App;
