import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useWindowDimensions from '../hooks/useWindowDimensions';

interface FilmItemProps {
  imgUrl: string;
  title: string;
  subtitle: string;
  item: any;
  style?: any;
}

const FilmItem = (props: FilmItemProps) => {
  const { imgUrl, title, subtitle, style, item } = props;
  const { width, height } = useWindowDimensions();

  const navigate = useNavigate();

  const Image = styled.img`
    width: ${(width - 400 - 12 * 4) / 5}px;
    aspect-ratio: 114/169;
    cursor: pointer;
  `;

  const Title = styled.a`
    width: ${(width - 400 - 12 * 4) / 5}px;
    color: white;
    text-decoration: none;
    font-size: 16px;
    font-weight: 400;
    color: #dbdbdb;
  `;

  const onClick = () => {
    navigate(`/movie/${item._id}`);
  };

  return (
    <div style={style}>
      <Image onClick={onClick} src={imgUrl} alt="" />
      <h3
        style={{ width: (width - 400 - 12 * 4) / 5, overflow: 'hidden' }}
        className="title"
      >
        <Title href="">{title}</Title>
      </h3>
      <h3 style={{ maxWidth: (width - 400 - 12 * 4) / 5 }} className="subtitle">
        <Title style={{ color: '#7a7a7a' }} href="">
          {subtitle}
        </Title>
      </h3>
    </div>
  );
};

export default FilmItem;
