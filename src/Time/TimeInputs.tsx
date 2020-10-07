// @typescript-eslint/no-unused-vars
// WORK IN PROGRESS

import * as React from 'react'
import {
  View,
  StyleSheet,
  useWindowDimensions,
  TextInput as TextInputNative,
} from 'react-native'
import { useTheme } from 'react-native-paper'

import {
  clockTypes,
  inputTypes,
  PossibleClockTypes,
  PossibleInputTypes,
} from './timeUtils'
import TimeInput from './TimeInput'
import AmPmSwitcher from './AmPmSwitcher'
import AnalogClock, { circleSize } from './AnalogClock'

function TimeInputs({
  hours,
  minutes,
  onFocusInput,
  focused,
  inputType,
  onChange,
  is24Hour,
}: {
  inputType: PossibleInputTypes
  focused: PossibleClockTypes
  hours: number
  minutes: number
  onFocusInput: (type: PossibleClockTypes) => any
  onChange: ({
    hours,
    minutes,
    focused,
  }: {
    hours: number
    minutes: number
    focused?: undefined | PossibleClockTypes
  }) => any
  is24Hour: boolean
}) {
  const startInput = React.useRef<TextInputNative | null>(null)
  const endInput = React.useRef<TextInputNative | null>(null)
  const dimensions = useWindowDimensions()
  const isLandscape = dimensions.width > dimensions.height
  const theme = useTheme()

  const onSubmitStartInput = React.useCallback(() => {
    if (endInput.current) {
      endInput.current.focus()
    }
  }, [endInput])

  const onSubmitEndInput = React.useCallback(() => {
    // TODO: close modal and persist time
  }, [])

  return (
    <View
      style={[
        styles.inputContainer,
        isLandscape && styles.inputContainerLandscape,
      ]}
    >
      <TimeInput
        ref={startInput}
        placeholder={'00'}
        value={hours}
        clockType={clockTypes.hours}
        pressed={focused === clockTypes.hours}
        onPress={onFocusInput}
        inputType={inputType}
        returnKeyType={'next'}
        onSubmitEditing={onSubmitStartInput}
        blurOnSubmit={false}
        onChanged={(newHours) =>
          onChange({
            hours: newHours,
            minutes,
          })
        }
        // onChangeText={onChangeStartInput}
      />
      <View style={styles.hoursAndMinutesSeparator}>
        <View style={styles.spaceDot} />
        <View style={[styles.dot, { backgroundColor: theme.colors.text }]} />
        <View style={styles.betweenDot} />
        <View style={[styles.dot, { backgroundColor: theme.colors.text }]} />
        <View style={styles.spaceDot} />
      </View>
      <TimeInput
        ref={endInput}
        placeholder={'00'}
        value={minutes}
        clockType={clockTypes.minutes}
        pressed={focused === clockTypes.minutes}
        onPress={onFocusInput}
        inputType={inputType}
        onSubmitEditing={onSubmitEndInput}
        onChanged={(newMinutes) =>
          onChange({
            hours,
            minutes: newMinutes,
          })
        }
      />
      {!is24Hour && (
        <>
          <View style={styles.spaceBetweenInputsAndSwitcher} />
          <AmPmSwitcher />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  spaceBetweenInputsAndSwitcher: { width: 12 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainerLandscape: {
    flex: 1,
  },
  hoursAndMinutesSeparator: {
    fontSize: 65,
    width: 24,
    alignItems: 'center',
  },
  spaceDot: {
    flex: 1,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 7 / 2,
  },
  betweenDot: {
    height: 12,
  },
})

export default React.memo(TimeInputs)