import React, { useMemo, useReducer } from 'react';

enum FeatureActionType {
  SHOW = 'SHOW',
  HIDE = 'HIDE',
}

export const useFeatureState = <FeatureState>(
  featureInitialState: FeatureState
): {
  hide: () => void;
  show: (payload: FeatureState) => void;
  state: [
    React.ReducerState<
      (
        state: FeatureState,
        action:
          | { type: FeatureActionType.HIDE }
          | { type: FeatureActionType.SHOW; payload: FeatureState }
      ) => FeatureState
    >,
    React.Dispatch<
      React.ReducerAction<
        (
          state: FeatureState,
          action:
            | { type: FeatureActionType.HIDE }
            | { type: FeatureActionType.SHOW; payload: FeatureState }
        ) => FeatureState
      >
    >
  ][0];
} => {
  type FeatureAction =
    | { type: FeatureActionType.HIDE }
    | { type: FeatureActionType.SHOW; payload: FeatureState };

  const featureReducer = (state: FeatureState, action: FeatureAction) => {
    switch (action.type) {
      case FeatureActionType.HIDE:
        return featureInitialState;
      case FeatureActionType.SHOW:
        return action.payload;
      default:
        throw new Error('Invalid feature action type');
    }
  };

  const [featureState, featureDispatch] = useReducer(
    featureReducer,
    featureInitialState
  );

  return useMemo(
    () => ({
      state: featureState,
      show: (payload: FeatureState) => {
        featureDispatch({
          type: FeatureActionType.SHOW,
          payload,
        });
      },
      hide: () => {
        featureDispatch({ type: FeatureActionType.HIDE });
      },
    }),
    [featureState]
  );
};
