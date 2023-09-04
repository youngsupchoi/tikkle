import ContentLoader, {Rect, Circle, Path} from 'react-content-loader/native';
import React from 'react';

export const WishlistManagementLoader = (width, height, props) => (
  <>
    <ContentLoader
      speed={2}
      width={400}
      height={1000}
      viewBox="0 0 400 1000"
      backgroundColor="#ddd"
      foregroundColor="#ecebeb"
      {...props}>
      <Rect x="16" y="12" rx="5" ry="5" width="64" height="64" />
      <Rect x="102" y="12" rx="5" ry="5" width="64" height="10" />
      <Rect x="102" y="28" rx="5" ry="5" width="100" height="12" />
      <Rect x="360" y="12" rx="5" ry="5" width="64" height="10" />

      <Rect x="16" y="92" rx="5" ry="5" width="64" height="64" />
      <Rect x="102" y="92" rx="5" ry="5" width="64" height="10" />
      <Rect x="102" y="108" rx="5" ry="5" width="100" height="12" />
      <Rect x="360" y="92" rx="5" ry="5" width="64" height="10" />

      <Rect x="16" y="172" rx="5" ry="5" width="64" height="64" />
      <Rect x="102" y="172" rx="5" ry="5" width="64" height="10" />
      <Rect x="102" y="188" rx="5" ry="5" width="100" height="12" />
      <Rect x="360" y="172" rx="5" ry="5" width="64" height="10" />

      <Rect x="16" y="252" rx="5" ry="5" width="64" height="64" />
      <Rect x="102" y="252" rx="5" ry="5" width="64" height="10" />
      <Rect x="102" y="268" rx="5" ry="5" width="100" height="12" />
      <Rect x="360" y="252" rx="5" ry="5" width="64" height="10" />
      {/* <Rect x="16" y="86" rx="5" ry="5" width="384" height="400" />
      <Rect x="16" y="524" rx="5" ry="5" width="220" height="10" />
      <Rect x="16" y="542" rx="5" ry="5" width="100" height="20" /> */}
      {/* <Circle cx="10" cy="50" r="8" /> */}
      {/* <Circle cx="10" cy="80" r="8" /> */}
      {/* <Circle cx="10" cy="110" r="8" /> */}
    </ContentLoader>
  </>
);
export const HomeLoader = (width, height, props) => (
  <>
    <ContentLoader
      speed={2}
      width={400}
      height={800}
      viewBox="0 0 400 800"
      backgroundColor="#ddd"
      foregroundColor="#ecebeb"
      {...props}>
      <Rect x="16" y="24" rx="5" ry="5" width="220" height="10" />
      <Rect x="16" y="42" rx="5" ry="5" width="100" height="20" />
      <Rect x="16" y="86" rx="5" ry="5" width="384" height="400" />
      <Rect x="16" y="524" rx="5" ry="5" width="220" height="10" />
      <Rect x="16" y="542" rx="5" ry="5" width="100" height="20" />
      <Rect x="16" y="586" rx="5" ry="5" width="200" height="200" />
      <Rect x="232" y="586" rx="5" ry="5" width="200" height="200" />
      <Rect x="448" y="586" rx="5" ry="5" width="200" height="200" />
      {/* <Circle cx="10" cy="50" r="8" /> */}
      {/* <Circle cx="10" cy="80" r="8" /> */}
      {/* <Circle cx="10" cy="110" r="8" /> */}
    </ContentLoader>
  </>
);

export const HistoryLoader = (width, height, props) => (
  <>
    <ContentLoader
      speed={2}
      width={400}
      height={800}
      viewBox="0 0 400 800"
      backgroundColor="#ddd"
      foregroundColor="#ecebeb"
      {...props}>
      <Rect x="0" y="100" rx="5" ry="5" width="400" height="64" />
      <Rect x="0" y="168" rx="5" ry="5" width="400" height="300" />
      <Rect x="-30" y="368" rx="50" ry="50" width="60" height="60" />
      <Rect x="-30" y="368" rx="50" ry="50" width="60" height="60" />
      <Rect x="0" y="472" rx="5" ry="5" width="400" height="32" />
      {/* <Circle cx="10" cy="50" r="8" /> */}
      {/* <Circle cx="10" cy="80" r="8" /> */}
      {/* <Circle cx="10" cy="110" r="8" /> */}
    </ContentLoader>
  </>
);
