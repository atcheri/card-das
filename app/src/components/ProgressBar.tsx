import { CSSProperties, FC } from 'react';

type ProgressBarProps = {
  color: string;
  current: number;
  max: number;
  height?: number;
};

const ProgressBar: FC<ProgressBarProps> = ({ color, current, max, height = 5 }) => {
  const Parentdiv: CSSProperties = {
    width: '100%',
    backgroundColor: 'whitesmoke',
    borderRadius: 2,
  };

  const progress = (current / max) * 100;
  const Childdiv: CSSProperties = {
    height: '100%',
    width: `${progress}%`,
    borderRadius: 2,
    textAlign: 'right',
  };

  const progresstext: CSSProperties = {
    color: 'white',
  };

  return (
    <div style={Parentdiv} className={`h-${height} font-semibold`}>
      <div style={Childdiv} className={`bg-${color}`}>
        <span style={progresstext}>{`${current} / ${max}`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
