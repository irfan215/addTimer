/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */



// export default App;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet
} from "react-native";

const App = () => {
  const [timers, setTimers] = useState<any>([]);

  const AddTimer = () => {
    const newTimer = { seconds: 0, isRunning: false, buttonText: "Start" };
    setTimers([...timers, newTimer]);
  };

  const handleStartPauseTimer = (index: number) => {
    setTimers((prevTimers:any) => {
      const updatedTimers = [...prevTimers];
      const timer = updatedTimers[index];

      if (timer.isRunning) {
        timer.isRunning = false;
        timer.buttonText = "Resume";
        clearInterval(timer.intervalId);
      } else {
        timer.isRunning = true;
        timer.buttonText = "Pause";
        if (timer.seconds > 0) {
          timer.intervalId = startCountdown(index, timer.seconds);
        }
      }

      return updatedTimers;
    });
  };

  const handleEditTimer = (index:any, seconds:any) => {
    setTimers((prevTimers: any) => {
      const updatedTimers = [...prevTimers];
      updatedTimers[index].seconds = seconds;
      return updatedTimers;
    });
  };

  const startCountdown = (index: number, seconds: number) => {
    return setInterval(() => {
      setTimers((prevTimers: any) => {
        const updatedTimers = [...prevTimers];
        const timer = updatedTimers[index];

        if (timer.isRunning && timer.seconds > 0) {
          timer.seconds = timer.seconds - 1;
        } else {
          timer.isRunning = false;
          timer.buttonText = "Start";
          clearInterval(timer.intervalId);
        }

        return updatedTimers;
      });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={AddTimer}
        style={styles.addTimerButton}
      >
        <Text style={styles.addTimerButtonText}>Add Timer</Text>
      </TouchableOpacity>
      <View style={styles.listBorder}>
        <FlatList
          data={timers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={styles.timerItem}
            >
              <View>
                <TextInput
                  style={styles.timerInput}
                  placeholder="Enter sec"
                  keyboardType="numeric"
                  onChangeText={(text) => handleEditTimer(index, parseInt(text))}
                />
                <Text style={{ fontSize: 12 }}>Time in seconds</Text>
              </View>
              <View
                style={styles.timerInfo}
              >
                <View>
                  <Text style={styles.timerText}>{`${String(Math.floor(item.seconds / 3600)).padStart(2, '0')}:${String(
                    Math.floor((item.seconds % 3600) / 60)
                  ).padStart(2, '0')}:${String(item.seconds % 60).padStart(2, '0')}` as string}</Text>

                  <Text style={{ fontSize: 12, right: '30%', }}>Time Converted to {`\n`}HH:mm:ss</Text>
                </View>
                <View>
                  <TouchableOpacity style={styles.timerButton} onPress={() => handleStartPauseTimer(index)}>
                    <Text>{item.buttonText}</Text>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 12 }}>initial, start, pause {`\n`} Resume</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  addTimerButton: {
    alignSelf: "center",
    width: "50%",
    height: 40,
    backgroundColor: "gray",
    marginTop: 20,
    paddingVertical: 2,
    justifyContent: "center",
  },
  addTimerButtonText: {
    textAlign: "center",
    color: "white",
  },
  listBorder:{
    borderWidth: 1,
    borderColor: "black",
    marginTop: 10,
    width: "95%",
    paddingBottom: '5%',
    paddingTop: '5%'
  },
  timerItem: {
    flexDirection: "row",
    alignSelf: "center",
    width: "95%",
    justifyContent: 'space-between',
  },
  timerInput: {
    width: "90%",
    // height:'57%',
    paddingVertical: 2,
    marginTop: '5%',
    // marginRight: 7,
    borderWidth: 1,
    borderColor: "black",
  },
  timerText: {
    width: "90%",
    textAlign: 'center',
    marginTop: '2%',
    right: '30%',
    borderWidth: 1,
    borderColor: "black",
  },
  timerButton: {
    width: "90%",
    marginTop: '2%',
    marginRight: 7,
    borderWidth: 1,
    borderColor: "black",
    alignItems: 'center'
  },
  timerInfo: {
    // flex: 1,
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
  },
});

export default App;
