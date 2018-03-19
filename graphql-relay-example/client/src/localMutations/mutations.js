import environment from './../Environment';
import { commitLocalUpdate } from 'react-relay';

// mutate client state by using viewerId and setting the new value
export const toggleAddPostDetails = (viewerId, show) => {
    commitLocalUpdate(environment, store => {
        const viewerProxy = store.get(viewerId);
        viewerProxy.setValue(show, 'showAddPostDetails');
    });
}
