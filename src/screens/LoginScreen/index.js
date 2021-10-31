import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {Colors} from '../../global/constants/index';
import Icon from 'react-native-vector-icons/Feather';
import {setToken} from '../../redux/app/app.actions';
import {connect} from 'react-redux';

const index = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [textentry, setTextEntry] = useState(false);
  const [loading, setLoading] = useState(false);
  const {setToken} = props;

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (email == '' || password == '') {
      alert('Please do not leave the field blank!');
    } else {
      const token = Math.random().toString(16).substr(2, 14);
      setToken(token);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}>
      <View style={{marginHorizontal: 20, flex: 1}}>
        <KeyboardAvoidingView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}>
            <View style={{marginTop: 100}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 20,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    color: Colors.white,
                    fontWeight: 'bold',
                    paddingVertical: 10,
                  }}>
                  Welcome
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 16,
                    color: Colors.lightgray,
                    marginTop: 10,
                  }}>
                  Enter some random email
                </Text>
              </View>

              <TextInput
                style={{
                  height: 45,
                  borderWidth: 1,
                  backgroundColor: Colors.white,
                  borderColor: Colors.lightgray,
                  borderRadius: 5,
                  marginBottom: 5,
                  marginTop: 10,
                  paddingHorizontal: 16,
                }}
                value={email}
                onChangeText={setEmail}
                placeholder={'Email'}
                keyboardType={'default'}
              />

              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 1,
                  backgroundColor: Colors.white,
                  borderColor: Colors.lightgray,
                  borderRadius: 5,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <TextInput
                  style={{
                    height: 45,
                    paddingHorizontal: 16,
                    width: Dimensions.get('window').width - 80,
                  }}
                  value={password}
                  onChangeText={setPassword}
                  placeholder={'Password'}
                  secureTextEntry={!textentry}
                />
                <TouchableOpacity
                  style={{
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 90,
                  }}
                  onPress={() => setTextEntry(!textentry)}>
                  {textentry === false ? (
                    <Icon
                      name="eye-off"
                      color={Colors.green}
                      size={20}
                      style={{marginRight: 12}}
                    />
                  ) : (
                    <Icon
                      name="eye"
                      size={20}
                      color={Colors.green}
                      style={{marginRight: 12}}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.green,
                  marginVertical: 20,
                  borderRadius: 5,
                }}
                onPress={() => handleSubmit()}>
                {loading ? (
                  <ActivityIndicator size="small" color={Colors.white} />
                ) : (
                  <Text
                    style={{
                      fontSize: 17,
                      color: Colors.white,
                      fontWeight: 'bold',
                    }}>
                    Login
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = null;

const mapDispatchToProps = {setToken};

export default connect(mapStateToProps, mapDispatchToProps)(index);
