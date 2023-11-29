import useLoginStore from './modules/login';
import useRoutersStore from './modules/routers';
export default function useStore() {
  return {
    login: useLoginStore(),
    routers: useRoutersStore(),
  };
}
