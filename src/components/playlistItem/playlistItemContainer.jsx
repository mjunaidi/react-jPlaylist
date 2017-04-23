import React from 'react';
import { Motion, spring } from 'react-motion';
import { connectWithId } from 'react-jplayer-utils';
import { actions as jPlayerActions } from 'react-jplayer';
import PropTypes from 'prop-types';
import { passWithIndex } from 'react-jplayer-utils';

import { setOption, select, remove, play, blur, shuffle, setPlaylist } from '../../actions/actions';
import PlaylistItem from './playlistItem';

const currentMedia = 'jp-playlist-current';

const mapStateToProps = ({ jPlayers, jPlaylists }, { id, children }) => ({
  autoBlur: jPlaylists[id].autoBlur,
  current: jPlaylists[id].current,
  playlistItemAnimationConfig: jPlaylists[id].playlistItemAnimationConfig,
  shuffled: jPlaylists[id].shuffled,
  playlist: jPlaylists[id].playlist,
  itemClass: jPlaylists[id].itemClass,
});

class PlaylistItemContainer extends React.Component {
  static get propTypes() {
    return {
      children: React.PropTypes.node.isRequired,
      dispatch: PropTypes.func.isRequired,
      id: PropTypes.number.isRequired,
      current: PropTypes.number.isRequired,
      autoBlur: PropTypes.bool.isRequired,
      minHeight: PropTypes.number.isRequired,
      maxHeight: PropTypes.number.isRequired,
      playlistItemAnimationConfig: PropTypes.object.isRequired,
      shuffled: PropTypes.bool.isRequired,
      playlist: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          artist: PropTypes.string,
          sources: PropTypes.arrayOf(PropTypes.string).isRequired,
          poster: PropTypes.string,
          free: PropTypes.bool,
        }),
      ).isRequired,
      itemClass: React.PropTypes.string.isRequired,
    };
  }
  static get defaultProps() {
    return {
      minHeight: 0,
      maxHeight: 1,
      attributes: null,
    };
  }
  render() {
    // const mediaListClass = this.props.current === this.props.index ?
    //   this.className.currentMedia : null;
    // const mediaLinkClass = this.props.current === this.props.index ?
    //   `${this.props.itemClass} ${this.className.currentMedia}` : this.props.itemClass;

    return (
      <PlaylistItem>
        {this.props.children}
      </PlaylistItem>
    );
  }
}
/* {this.props.medias.map((media, index) => {
  const animationHeight = media.isRemoving ? this.props.minHeight : this.props.maxHeight;
  const mediaListClass = this.props.current === index ? currentMedia : null;
  const mediaLinkClass = this.props.current === index ? `${this.props.itemClass} ${currentMedia}` : this.props.itemClass;
  const onRest = media.isRemoving ? () => this.props.onRest(index) : null;

  return (<Motion key={media.key} defaultStyle={{ heightToInterpTo: this.props.minHeight }} style={{ heightToInterpTo: spring(animationHeight, this.props.config) }} onRest={onRest}>
    {values =>
      <li className={mediaListClass} style={{ transform: `scaleY(${values.heightToInterpTo})`, transformOrigin: '50% top' }}>
        {this.props.enableRemoveControls && <a href="javascript:;" className={this.props.removeItemClass} onClick={this._onRemoveMediaClick.bind(this, index)}>&times;</a>}
        {media.free && <span className={this.props.freeGroupClass}>({media.freeMediaLinks})</span>}
        <a href="javascript:;" className={mediaLinkClass} onClick={this._onMediaLinkClick.bind(this, index)} tabIndex="0">
          <img src={media.poster} />
          {media.title}
          {media.artist && <span className="jp-artist">by {media.artist}</span>}
        </a>
      </li>
                }
  </Motion>);
},
    )}*/

export default connectWithId(mapStateToProps)(passWithIndex(PlaylistItemContainer));
