import * as React from "react";
import { TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import {
  Header,
  Left,
  Body,
  Right,
  Container,
  Col,
  Row,
  Grid,
  Footer,
} from "native-base";

import Icon from "react-native-vector-icons/FontAwesome";

import SearchComponent from "@components/SearchComponent";
import EntriesComponent from "@components/EntriesComponent";
import BarcodeInput from "@components/BarcodeInputComponent";
import CategoriesComponent from "@components/CategoriesComponent";

export default class SalesList extends React.PureComponent {
  onPressItem = index => this.props.onItemClick(index);
  onPressCategory = (id, index) => this.props.onCategoryClick(id, index);

  onSearchClick = () => this.props.onSearchClick(true);
  navigate = () => this.props.navigation.navigate("DrawerOpen");

  onItemEndReached = () => this.props.onEndReached("item");
  onCategoryEndReached = () => this.props.onEndReached("category");

  ref = c => {
    this.barcode = c;
  };

  onFocusInput() {
    this.barcode.focus();
  }

  renderSearch() {
    const { onSearchClick, onChangeSalesSearchText } = this.props;
    return (
      <SearchComponent
        status="Sales"
        onSearchClick={onSearchClick}
        onChangeText={onChangeSalesSearchText}
      />
    );
  }

  renderHeader() {
    return (
      <Header>
        <Left>
          <TouchableOpacity onPress={this.navigate}>
            <Icon
              size={25}
              name="bars"
              color="white"
              style={styles.headerLeftIcon}
            />
          </TouchableOpacity>
        </Left>
        <Body />
        <Right>
          <TouchableOpacity onPress={this.onSearchClick}>
            <Icon
              size={25}
              name="search"
              color="white"
              style={styles.headerRightIcon}
            />
          </TouchableOpacity>
        </Right>
      </Header>
    );
  }

  renderBarcode() {
    const { onCloseClick, onBarcodeRead } = this.props;
    return (
      <BarcodeInput
        status="Sales"
        onBarcodeRead={onBarcodeRead}
        onChangeSalesStatus={onCloseClick}
      />
    );
  }

  render() {
    const {
      searchStatus,
      salesListStatus,
      bluetoothStatus,

      // EntriesComponent
      currency,
      itemData,
      itemsLength,
      onLongPressItem,

      // CategoriesComponent
      categoryData,
      categoryLengths,
      selectedCategoryIndex,

      // TextInput
      onChangeBarcodeScannerInput,
    } = this.props;

    return (
      <Container>
        {searchStatus ? this.renderSearch() : this.renderHeader()}

        {salesListStatus ? (
          this.renderBarcode()
        ) : bluetoothStatus ? (
          <Container>
            <Grid>
              <Row>
                <Col size={65}>
                  <EntriesComponent
                    data={itemData}
                    currency={currency}
                    itemsLength={itemsLength}
                    onPressItem={this.onPressItem}
                    onLongPressItem={onLongPressItem}
                    onEndReached={this.onItemEndReached}
                  />
                </Col>
                <Col size={35}>
                  <CategoriesComponent
                    data={categoryData}
                    disabled={searchStatus}
                    itemsLength={itemsLength}
                    catLengths={categoryLengths}
                    bluetoothStatus={bluetoothStatus}
                    onCategoryClick={this.onPressCategory}
                    onEndReached={this.onCategoryEndReached}
                    selectedCategoryIndex={selectedCategoryIndex}
                  />
                </Col>
              </Row>
            </Grid>
            <Footer style={styles.footer}>
              <View style={styles.footerView}>
                <TextInput
                  ref={this.ref}
                  autoFocus={true}
                  style={styles.footerBarcode}
                  underlineColorAndroid="transparent"
                  value={this.props.barcodeScannerInput}
                  onChangeText={onChangeBarcodeScannerInput}
                  onSubmitEditing={() => {
                    this.props.onBluetoothScan(this.props.barcodeScannerInput);
                    this.onFocusInput();
                  }}
                  blurOnSubmit={false}
                />
              </View>
            </Footer>
          </Container>
        ) : (
          <Grid>
            <Row>
              <Col size={65}>
                <EntriesComponent
                  data={itemData}
                  currency={currency}
                  itemsLength={itemsLength}
                  onPressItem={this.onPressItem}
                  onLongPressItem={onLongPressItem}
                  onEndReached={this.onItemEndReached}
                />
              </Col>
              <Col size={35}>
                <CategoriesComponent
                  data={categoryData}
                  disabled={searchStatus}
                  itemsLength={itemsLength}
                  catLengths={categoryLengths}
                  onCategoryClick={this.onPressCategory}
                  onEndReached={this.onCategoryEndReached}
                  selectedCategoryIndex={selectedCategoryIndex}
                />
              </Col>
            </Row>
          </Grid>
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4b4c9d",
  },
  headerLeftIcon: {
    paddingLeft: 5,
  },
  headerRightIcon: {
    paddingRight: 5,
  },
  footer: {
    backgroundColor: "transparent",
  },
  footerView: {
    marginTop: 10,
    width: "98%",
  },
  footerBarcode: {
    borderWidth: 1,
    borderColor: "gray",
  },
});
