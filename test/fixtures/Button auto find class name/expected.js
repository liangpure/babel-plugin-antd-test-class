<div>
  <Button className="Button-autotest-reset">reset</Button>
  <Button className="Button-autotest-query"><FormattedMessage {...messages.query} /></Button>
  <Button className="Button-autotest-save">{formatMessage(Lang.save)}</Button>
  <Button>{getButtonDisplayName()}</Button>
  <Button {...rest} >
    {children}
  </Button>
</div>