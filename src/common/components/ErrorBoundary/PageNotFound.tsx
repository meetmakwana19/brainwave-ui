import React from 'react'
import { EmptyState, PageLayout } from '@contentstack/venus-components'
import { useHistory } from 'react-router-dom'

const PageNotFound: React.FC = () => {
    const history = useHistory();
    return (
        <PageLayout
            content={{
                component:
                    <EmptyState
                        heading={'404 - Page not found'}
                        description={'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'}
                        type="secondary"
                        moduleIcon="PageNotFound"
                        actions={<div className="mt-20 EmptyState__link flex-center" onClick={() => history.go(-1)}>{'Go Back'}</div>}
                    />

                , alignContent: 'center'
            }}
            type='empty'
        />
    )
}

export default PageNotFound