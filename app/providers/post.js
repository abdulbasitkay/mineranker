import React, { Component } from 'react'
import MobileDetect from 'mobile-detect'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

// import the root view that this provider is connected to
import PostView from './../views/post'

// grab any actions we need to perform
import { getPosts } from './../reducer/ducks/post'

// import any services we might need
import * as api from './../services/api'

// pull any application data from redux needed for view
function mapStateToProps (state) {
  return {
    ...state.post
  }
}

class PostProvider extends Component {
  constructor (): void {
    super(...arguments)

    // Detect if we're on mobile so we can automuted videos to autoplay
    const md = new MobileDetect(window.navigator.userAgent)
    this.isMobile = (md.mobile() !== null || md.tablet() !== null)

    // Bind functions
    this.onLoadMore = this.onLoadMore.bind(this)
  }

  componentDidMount () {
    this.onLoadMore()
  }

  render (): React.Element<any> {
    const props = {
      ...this.props,
      onLoadMore: this.onLoadMore
    }

    return <PostView {...props} />
  }

  onLoadMore (): void {
    const { dispatch, pagination } = this.props
    console.log('loading more | pagination', pagination)

    dispatch(getPosts(pagination, api))
  }
}

export default connect(mapStateToProps)(PostProvider)
