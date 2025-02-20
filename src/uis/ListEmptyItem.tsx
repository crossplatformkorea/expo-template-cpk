import type {ViewStyle} from 'react-native';
import styled, {css} from '@emotion/native';
import {Icon, useCPK} from 'cpk-ui';

const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

function Component({style}: {style?: ViewStyle}): JSX.Element {
  const {theme} = useCPK();

  return (
    <Container
      style={[
        css`
          padding: 24px;
        `,
        style,
      ]}
    >
      <Icon color={theme.text.disabled} name="QuestBoxFill" size={14} />
    </Container>
  );
}

export default Component;
