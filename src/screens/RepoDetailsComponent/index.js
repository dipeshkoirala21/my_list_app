import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Colors} from '../../global/constants/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const index = props => {
  const item = props.route.params.item;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}>
      <View style={{marginHorizontal: 20, flex: 1}}>
        <View style={{margin: 10, flexDirection: 'row'}}>
          <Image
            style={{height: 100, width: 100, borderRadius: 50}}
            source={{
              uri: item.owner.avatar_url,
            }}
          />
          <View style={{marginTop: 10, marginHorizontal: 20}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                color: Colors.lightgray,
                textTransform: 'uppercase',
              }}>
              {item.owner.login}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(item.owner.html_url);
              }}
              activeOpacity={0.8}
              style={{
                height: 30,
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: Colors.lightgray,
                backgroundColor: Colors.lightgray,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
                marginTop: 5,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Feather
                  name="user-plus"
                  size={20}
                  color={Colors.darkBackground}
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 14,
                    color: Colors.darkBackground,
                    marginLeft: 5,
                  }}>
                  Followers
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{margin: 10, flexDirection: 'row'}}>
          <Icon name="notebook-outline" size={20} color={Colors.lightgray} />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 14,
              color: Colors.lightgray,
              marginLeft: 5,
            }}>
            {item.full_name}
          </Text>
        </View>
        <Text
          style={{
            fontStyle: 'italic',
            fontSize: 12,
            color: Colors.lightgray,
            marginLeft: 10,
          }}>
          {item.description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <View style={{margin: 5, flexDirection: 'row'}}>
            <Icon name="star-outline" size={20} color={Colors.lightgray} />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                color: Colors.lightgray,
                marginLeft: 5,
              }}>
              {item.stargazers_count}
            </Text>
          </View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 14,
              color: Colors.lightgray,
              margin: 5,
            }}>
            {item.license ? item.license.name : null}
          </Text>

          <View style={{margin: 5, flexDirection: 'row'}}>
            <Icon name="source-fork" size={18} color={Colors.lightgray} />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                color: Colors.lightgray,
                marginLeft: 5,
              }}>
              {item.forks}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(item.owner.html_url);
          }}
          activeOpacity={0.8}
          style={{
            height: 50,
            borderRadius: 30,
            borderWidth: 0.5,
            borderColor: Colors.lightgray,
            backgroundColor: Colors.green,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 16,
            marginTop: 100,
            margin: 20,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon name="web" size={20} color={Colors.white} />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                color: Colors.white,
                marginLeft: 5,
              }}>
              Go to repo
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default index;
