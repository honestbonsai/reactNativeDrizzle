/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import ReadString from "./ReadString";
import SetString from "./SetString";
import TutorialToken from "./TutorialToken";

type Props = {};
export default class Screen extends Component<Props> {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();

      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  compomentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <Text>Loading...</Text>
        ) : (
          <View>
            <ReadString
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
            />
            <SetString
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
            />
            <TutorialToken
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
