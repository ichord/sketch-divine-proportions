canvas = null
context = null

function initEnv(_context) {
  context = _context
  var page = context.document.currentPage()
  var artboard = page.currentArtboard()
  canvas = artboard || page
}

function makeRect(parent, width, height, x, y) {
  var shape = MSRectangleShape.alloc().initWithFrame(NSMakeRect(0, 0, 100, 100))
  layer = MSShapeGroup.shapeWithPath(shape)

  layer.frame().width = width
  layer.frame().height = height
  layer.frame().x = x || 0
  layer.frame().y = y || 0

  border = layer.style().addStylePartOfType(1)
  border.position = 0
  border.thickness = 1
  border.color = [MSColor colorWithSVGString:"#979797"]

  fill = layer.style().addStylePartOfType(0)
  fill.color = [MSColor colorWithRed:0 green:0 blue:0 alpha:0.0]

  parent.addLayers([layer])
  return layer
}

function makePath (parent, path, name) {
  layer = MSShapeGroup.shapeWithBezierPath(bzPath)
  layer.name = name || parent.name()
  layer.style().addStylePartOfType(1)
  layer.style().border().position = 0
  layer.style().border().thickness = 1
  layer.style().border().color = [MSColor colorWithSVGString:"#979797"]
  layer.constrainProportions = true

  return parent.addLayers([layer])
}

function goldenRect (parent, rect) {
  rect = makeRect(parent, rect.w, rect.w / 1.618, rect.x, rect.y)
  rect.name = "Golden Rectangle"
  rect.constrainProportions = true
  return rect
}

function makeGrid (parent, rect, radio) {
  w = rect.w
  h = rect.h
  x = rect.x
  y = rect.y

  vSection = w * radio
  hSection = h * radio

  bzPath = NSBezierPath.new()

  bzPath.appendBezierPathWithRect(NSMakeRect(x, y, w, h))

  bzPath.moveToPoint(NSMakePoint(x + vSection, y))
  bzPath.lineToPoint(NSMakePoint(x + vSection, y + h))

  bzPath.moveToPoint(NSMakePoint(w - vSection + x, y))
  bzPath.lineToPoint(NSMakePoint(w - vSection + x, y + h))

  bzPath.moveToPoint(NSMakePoint(x, y + hSection))
  bzPath.lineToPoint(NSMakePoint(x + w, y + hSection))

  bzPath.moveToPoint(NSMakePoint(x, y + h - hSection))
  bzPath.lineToPoint(NSMakePoint(x + w, y + h - hSection))

  return makePath(parent, bzPath)
}

function addGroup(name, drawingAction) {
  var group = MSLayerGroup.new()
  group.name = name
  drawingAction.call(this, group)
  group.ignoreNextClickThrough = true
  group.constrainProportions = true
  group.resizeToFitChildrenWithOption(1)
  canvas.addLayers([group])
  return group
}

function loopSelectedLayers(action) {
  var loop = context.selection.objectEnumerator()
  if (context.selection.count() == 0) {
    action.call(this, {
      x: 0,
      y: 0,
      w: 600,
      h: 600 / 1.618
    })
  }
  while (sel = loop.nextObject()) {
    isArtBoard = sel.class() == MSArtboardGroup
    action.call(this, {
      x: isArtBoard ? 0 : sel.frame().x(),
      y: isArtBoard ? 0 : sel.frame().y(),
      w: sel.frame().width(),
      h: sel.frame().height()
    })
  }
}
