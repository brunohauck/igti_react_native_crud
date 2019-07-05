import { AsyncStorage } from 'react-native';

const deviceStorage = {
  
    async loadJWT() {
        try {
          const value = await AsyncStorage.getItem('id_token');
          console.log('-------------<5>--------------')
          console.log(value)
          
          if (value !== null) {            
            return value
          } else {
            return false
          }
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
          return false
        }
    },


    async deleteJWT() {
        try{
          await AsyncStorage.removeItem('id_token')
          .then(
            () => {
              this.setStateJwt({
                jwt: ''
              })
            }
          );
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      },
    async saveKey(key, value) {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        console.log('AsyncStorage Error: ' + error.message);
      }
    }
    
  };

export default deviceStorage;