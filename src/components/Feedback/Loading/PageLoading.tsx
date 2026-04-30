import FullscreenCenter from '../../Layout/FullscreenCenter';
import { Spinner } from './Spinner';

export default function PageLoading() {
  return (
    <FullscreenCenter>
      <Spinner className="h-10 w-10" />
    </FullscreenCenter>
  );
}
