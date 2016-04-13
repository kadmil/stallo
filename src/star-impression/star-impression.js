import React from 'react'
import classNames from 'classnames'
import $ from 'jquery'

import './star-impression.styl'

import Velocity from 'velocity-animate'

// phys
import { Engine, World, Bodies, Body, Common, Vertices } from 'matter-js'
import CustomRender from './custom-renderer'

export default class StarImpression extends React.Component {
  constructor() {
    super()
    this.stars = []
  }

  initPhysics() {
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

    engine.world.gravity.y = 3

    let fld = 20
    let ground = [
      Bodies.rectangle(w * 0.5, -0.5 * fld, w, fld, { isStatic: true }),
      Bodies.rectangle(-0.5 * fld, h * 0.5, fld, h, { isStatic: true }),
      Bodies.rectangle(w + 0.5 * fld, h * 0.5, fld, h, { isStatic: true }),
      Bodies.rectangle(w * 0.5, h + 0.5 * fld, w, fld, { isStatic: true }),
    ]

    World.add(engine.world, ground);
    Engine.run(engine);

    this.physEngine = engine;
  }

  animateBoom() {
    Velocity(this.refs.title, { translateY: -50 },
      {'duration': 60, delay: 45, easing: 'easeOutExpo', complete: () => {
        Velocity(
          this.refs.title,
          { translateY: [ 0, [500, 20], -50] },
          { duration: 400, queue: false }
        )
      }})

    Velocity(this.refs.description, { translateY: -65 },
      {'duration': 60, easing: 'easeOutExpo', complete: () => {
         Velocity(
          this.refs.description,
          { translateY: [ 0, [500, 20], -65] },
          { duration: 400, queue: false }
        )
      }})

    Velocity(
      this.refs.counter,
      { scale: [ 1.0, [200, 8], 1.4] },
      { duration: 800, queue: false }
    )
  }

  componentWillReceiveProps(newProps) {
    this.animateBoom()

    $( this.refs.counter ).text( newProps.counter )

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
        x: (forceMagnitude + 2.5 * Common.random() * forceMagnitude) * Common.choose([1, -1]),
        y: -forceMagnitude + Common.random() * -forceMagnitude
      });
      Body.setAngularVelocity(body, Common.random(-0.6, 0.6))

      newStars.push(body);
    }

    World.add(this.physEngine.world, newStars)

    this.stars.push.apply( this.stars, newStars )

    // Прибираться время от времени
    let starsLimit = 100
    let starTax = 50

    if ( this.stars.length > starsLimit) {
      let toRemove = Math.max(
        this.stars.length - starsLimit + starTax,
        0)

      for( var i = 0; i < toRemove; ++i ) {
        World.remove( this.physEngine.world, this.stars[i])
      }

      this.stars.splice(0, toRemove)
    }
  }

  render() {
    let styleVal = {
      maxWidth:  `${this.props.width}px`,
      maxHeight: `${this.props.height}px`,
      minWidth:  `${this.props.width}px`,
      minHeight: `${this.props.height}px`,
      backgroundColor: this.props.background,
    }

    let sizeState = (this.props.width < 800) ? 'small' : 'medium'

    return (
      <div className={ classNames( "star-impression", `-size-${sizeState}` ) } style={styleVal}>

        <div className='static-markup' ref='staticMarkup'>
          <div className='title' ref='title'>
            { this.props.title }
          </div>

          <div className='description' ref='description'>
            { this.props.description }
          </div>

          <div className='impress-counter' ref='counter'>
            { this.props.counter }
          </div>
        </div>


        <div className='canvas-container' ref='canvasBox'></div>
      </div>
    )
  }

  componentDidMount() { this.initPhysics() }
  shouldComponentUpdate() { return false; }
}

StarImpression.propTypes = {
  counter:     React.PropTypes.number,
  background:  React.PropTypes.string,
  title:       React.PropTypes.string,
  description: React.PropTypes.string,
}

StarImpression.defaultProps = {
  counter: 0,
  background: '#FF8F92',
  title: 'Ну вот и все, ребята!',
  description: `
    Я бы совсем не справился без вас, и все это было просто замечательно!
    А вы как считаете? Оцените презентацию с помощью эмоций.
  `
}


