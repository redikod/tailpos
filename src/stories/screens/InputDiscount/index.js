import * as React from "react";
import { View } from "react-native";
import { Content, Form, Item, Input, Picker, Text } from "native-base";

import { unformat, formatNumber } from "accounting-js";

import ButtonComponent from "@components/ButtonComponent";
import IdleComponent from "@components/IdleComponent";
let MoneyCurrency = require("money-currencies");

export default class InputDiscount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      value: "",
      percentageType: "percentage",
    };
  }

  clear() {
    this.setState({ name: "", value: "", percentageType: "percentage" });
  }

  onValueChange(value) {
    this.setState({
      percentageType: value,
    });
  }

  onBlur() {
    const value = formatNumber(this.state.value);
    this.setState({ value });
  }

  onFocus() {
    if (this.state.value === "") {
      this.setState({ value: "" });
    } else {
      const value = unformat(this.state.value);
      this.setState({ value: value.toFixed(2) });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;

    if (data) {
      const value = formatNumber(data.value);

      this.setState({
        name: data.name,
        value: value,
        percentageType: data.percentageType.toString(),
      });
    }
  }

  render() {
    let mc = new MoneyCurrency(
      this.props.currency ? this.props.currency : "PHP",
    );

    if (this.props.status === "idle") {
      return (
        <IdleComponent
          type="Discount"
          onPress={() => this.props.onIdleClick()}
        />
      );
    } else {
      return (
        <Content padder>
          <Form>
            <View>
              <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                Discount Name
              </Text>
              <Item regular style={{ marginBottom: 10 }}>
                <Input
                  placeholder="Discount Name"
                  value={this.state.name}
                  onChangeText={text => this.setState({ name: text })}
                />
              </Item>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, marginRight: 30 }}>
                <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                  Discount Value
                </Text>
                <Item regular style={{ marginBottom: 10 }}>
                  <Input
                    keyboardType="numeric"
                    value={
                      this.state.value
                        ? this.state.percentageType === "fixDiscount"
                          ? mc.moneyFormat(this.state.value)
                          : this.state.value
                        : this.state.value
                    }
                    onBlur={() => this.onBlur()}
                    placeholder="Discount Value"
                    onFocus={() => this.onFocus()}
                    onChangeText={text => {
                      let newPrice = text;

                      if (this.state.percentageType === "fixDiscount") {
                        newPrice = text.slice(1);
                      }
                      this.setState({ value: newPrice });
                    }}
                  />
                </Item>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                  Discount Type
                </Text>
                <Picker
                  iosHeader="Select one"
                  mode="dropdown"
                  selectedValue={this.state.percentageType}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="Percentage" value="percentage" />
                  <Picker.Item label="Fix Discount" value="fixDiscount" />
                </Picker>
              </View>
            </View>
          </Form>
          <ButtonComponent
            status={this.props.status}
            onAdd={() => {
              const hasError = this.props.onAdd(this.state);
              if (hasError === false) {
                this.clear();
              }
            }}
            onEdit={() => {
              const hasError = this.props.onEdit(this.state);
              if (hasError === false) {
                this.clear();
              }
            }}
            onCancel={() => {
              this.props.onCancel();
              this.clear();
            }}
            text="Discount"
          />
        </Content>
      );
    }
  }
}
