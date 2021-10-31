import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Keyboard,
  Alert,
} from 'react-native';
import {Colors} from '../../global/constants/index';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {
  getRepoLists,
  getMoreRepoLists,
  setLoadMore,
  clearListData,
} from '../../redux/data/data.actions';
import {logout} from '../../redux/app/app.actions';
import {
  selectRepos,
  selectLoading,
  selectLoadMore,
} from '../../redux/data/data.selectors';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

const index = props => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInfiniteRefreshing, setIsInfiniteRefreshing] = useState(false);
  const {
    loading,
    repos,
    getRepoLists,
    setLoadMore,
    loadMore,
    getMoreRepoLists,
    clearListData,
    logout,
  } = props;

  const handleSearch = () => {
    Keyboard.dismiss();
    if (searchQuery == '') {
      alert('enter some parameter to search!');
    } else {
      getRepoLists(searchQuery, page);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => logout()},
    ]);
  };

  const handleLoadMore = () => {
    console.log('consoleee');
    if (isInfiniteRefreshing) {
      return null;
    } else {
      Promise.resolve(setLoadMore(true)).then(
        getMoreRepoLists(searchQuery, page),
      );
      setPage(page + 1);
    }
  };

  const onRefresh = async () => {
    getRepoLists(searchQuery, page);
  };

  const clearText = () => {
    setSearchQuery('');
    clearListData();
    setLoadMore(false);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Details', {item})}
        activeOpacity={0.8}
        style={{
          height: 100,
          borderRadius: 10,
          borderWidth: 0.5,
          borderColor: Colors.lightgray,
          backgroundColor: Colors.darkBackground,
          marginTop: 5,
        }}>
        <View style={{margin: 5, flexDirection: 'row'}}>
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
          }}
          numberOfLines={2}>
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
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: Colors.dark,
          height: 60,
          paddingHorizontal: 20,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: Colors.lightgray,
          }}>
          Github Repositories
        </Text>

        <TouchableOpacity
          style={{
            height: 45,
            width: 45,

            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => handleLogout()}>
          <MatIcon name="logout" size={25} color={Colors.lightgray} />
        </TouchableOpacity>
      </View>
      <View style={{marginHorizontal: 20, flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 5,
            marginTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              backgroundColor: Colors.white,
              borderColor: Colors.lightgray,
              borderRadius: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              style={{
                height: 45,
                paddingHorizontal: 16,
                width: Dimensions.get('window').width - 150,
              }}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder={'Search'}
              keyboardType={'default'}
            />

            <TouchableOpacity
              disabled={searchQuery == '' ? true : false}
              style={{
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 90,
              }}
              onPress={() => clearText()}>
              {searchQuery !== '' ? (
                <Icon
                  name="close"
                  color={Colors.red}
                  size={20}
                  style={{marginRight: 8}}
                />
              ) : null}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.dark,
              height: 45,
              width: 45,
              borderRadius: 45 / 2,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 4,
              borderColor: Colors.lightgray,
              borderWidth: 1,
            }}
            onPress={() => handleSearch()}>
            <MatIcon name="search" size={25} color={Colors.lightgray} />
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator animating size="small" color={Colors.green} />
        ) : (
          <>
            {repos.items.length <= 0 ? (
              <View
                style={{
                  marginTop: Dimensions.get('window').height / 2 - 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 14,
                    color: Colors.lightgray,
                    margin: 5,
                  }}>
                  Please search the repository
                </Text>
              </View>
            ) : (
              <View style={{flex: 1}}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={repos.items}
                  renderItem={renderItem}
                  keyExtractor={item => item.id}
                  numColumns={1}
                  onEndReached={() => handleLoadMore()}
                  onRefresh={onRefresh}
                  onEndReachedThreshold={0.1}
                  refreshing={isInfiniteRefreshing}
                  ListFooterComponent={() =>
                    loadMore ? (
                      <View
                        style={{
                          height: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {repos.items.length == repos.total_count ? (
                          <Text
                            style={{
                              fontWeight: 'bold',
                              fontSize: 14,
                              color: Colors.lightgray,
                              marginLeft: 5,
                            }}>
                            No More Data !
                          </Text>
                        ) : (
                          <ActivityIndicator
                            animating
                            size="small"
                            color={Colors.green}
                          />
                        )}
                      </View>
                    ) : (
                      <View style={{paddingBottom: 20}} />
                    )
                  }
                />
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};
const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  repos: selectRepos,
  loadMore: selectLoadMore,
});

const mapDispatchToProps = {
  getRepoLists,
  getMoreRepoLists,
  setLoadMore,
  clearListData,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
