import React from 'react'
import classNames from 'classnames'

import './star-impression.styl'

// phys
import { Engine, World, Bodies, Body, Common, Vertices } from 'matter-js'
import CustomRender from './custom-renderer'

export default class StarImpression extends React.Component {

  initRender() {
    let elem = this.refs.canvasBox

    let w = this.props.width
      , h = this.props.height

    let engine = Engine.create({
      render: {
        element: elem,
        // controller: CustomRender,
        options: {
          background: 'transparent',
          wireframes: false,
          width:  w,
          height: h
        }
    }});

    engine.world.gravity.y = 2

    let ground = [
      Bodies.rectangle(w * 0.5, 0, w, 20, { isStatic: true }),
      Bodies.rectangle(0, h * 0.5, 20, h, { isStatic: true }),
      Bodies.rectangle(w, h * 0.5, 20, h, { isStatic: true }),
      Bodies.rectangle(w * 0.5, h, w, 20, { isStatic: true }),
    ]

    World.add(engine.world, ground);
    Engine.run(engine);

    this.physEngine = engine;
  }

  componentWillReceiveProps(newProps) {
    let newStarsCount = newProps.counter - this.props.counter
    let newStars = [];
    let w = this.props.width
      , h = this.props.height

    for(var i = 0; i < newStarsCount; ++i) {
      let radius  = Common.random(20, 40);
      let scaleX  = radius * 2.0 * 1.0 / ( 512.0 - 13.0);
      let scaleY  = radius * 2.0 * 1.0 / ( 512.0 - 13.0);

      let body = Bodies.polygon(
        w * 0.5 + Common.random(-100, 100) ,
        h * 0.5 + Common.random(-100, 100),
        5,
        radius,
        {
          render: {
            sprite: {
                xOffset: -0.0,
                yOffset: -0.0,
                xScale: scaleX,
                yScale: scaleY,
                texture: require('./images/star-rot.png')
            },
            opacity: Common.random(0.8, 1.0)
          },

          density: 0.1,
          restitution: 0.01
        });

      let forceMagnitude = Common.random(0.01, 0.05) * body.mass;

      Body.applyForce(body, body.position, {
        x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
        y: -forceMagnitude + Common.random() * -forceMagnitude
      });
      Body.setAngularVelocity(body, Common.random(-0.6, 0.6))

      newStars.push(body);
    }

    World.add(this.physEngine.world, newStars)
  }

  render() {
    let styleVal = {
      maxWidth:  `${this.props.width}px`,
      maxHeight: `${this.props.height}px`,
      minWidth:  `${this.props.width}px`,
      minHeight: `${this.props.height}px`,
      backgroundColor: '#FF8F92',
    }

    let sizeState = (this.props.width < 800) ? 'small' : 'medium'

    let title = 'Ну вот и все, ребята!'

    let description = `
      Я бы совсем не справился без вас, и все это было просто замечательно!
      А вы как считаете? Оцените презентацию с помощью эмоций.
    `
    return (
      <div className={ classNames( "star-impression", `-size-${sizeState}` ) } style={styleVal}>

        <div className='static-markup'>
          <div className='title'> { title } </div>
          <div className='description'> { description } </div>

          <div className='impress-counter'>{ this.props.counter }</div>
        </div>


        <div className='canvas-container' ref='canvasBox'></div>
      </div>
    )
  }

  componentDidMount() { this.initRender() }
  shouldComponentUpdate() { return false; }
}
