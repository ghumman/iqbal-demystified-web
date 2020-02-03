	/*		
	$width: 40;
	$height: 2.2em;
	$margin: 0.5em;
	$radius: 0.35em;

	.vue-touch-keyboard {

		.keyboard {
			width: 100%;
			margin: 0;
			
			.line {
				display: flex;
				justify-content: space-around;    
				&:not(:last-child) {
					margin-bottom: $margin;
				}
			}
			
			.key {
				&:not(:last-child) {
					margin-right: $margin;
				}

				flex: $width;
				//width: $btnW;
				height: $height;
				line-height: $height;
				overflow: hidden;

				vertical-align: middle;
				border: 1px solid #ccc;
				color: #333;
				background-color: #fff;
				box-shadow: 0px 2px 2px rgba(0, 0, 0, .6);
				border-radius: $radius;

				font-size: 1.25em;
				text-align: center;
				white-space: nowrap;
				user-select: none;
				cursor: pointer;


				&.backspace {
					background-image: url("./icons/backspace.svg");
					background-position: center center;
					background-repeat: no-repeat;
					background-size: 35%;
				}
			
				&.half {
					flex: $width / 2;
				}

				&.control {
					color: #fff;
					background-color: #7d7d7d;
					border-color: #656565;
				}
							
				&.featured {
					color: #fff;
					background-color: #337ab7;
					border-color: #2e6da4;
				}

				&:hover {
					color: #333;
					background-color: #d6d6d6;
					border-color: #adadad;
				}
				
				&:active {
					transform: scale(.98); // translateY(1px);
					color: #333;
					background-color: #d4d4d4;
					border-color: #8c8c8c;					
				}

				&.activated {
					color: #fff;
					background-color: #5bc0de;
					border-color: #46b8da;
				}

			} // .key
			/*
			// Apple style
			.key {
				color: #aaa;
				//font: bold 9pt arial;
				background: #eff0f2;
				border-radius: 4px;
				border-top: 1px solid #ddd;
				box-shadow: 
					inset 0 0 25px #e8e8e8,
					0 1px 0 #c3c3c3,
					0 2px 0 #c9c9c9,
					0 2px 3px #333;
				text-shadow: 0px 1px 0px #f5f5f5;

				&.control {
					box-shadow: 
						0 1px 0 #c3c3c3,
						0 2px 0 #c9c9c9,
						0 2px 3px #333;
					text-shadow: 0px 1px 0px #777;
				}

				&:hover {
					color: #aaa;
					background-color: inherit;
					border-color: inherit;
				}

				&:active {
					color: #888;
					background: #ebeced;
					transform: translateY(3px);
					box-shadow: inset 0 0 25px #ddd, 0 0 3px #333;
					border-top: 1px solid #eee;
				}
			}*/

			.placeholder {
				flex: $width / 2;
				height: $height;
				line-height: $height;
				
				&:not(:last-child) {
					margin-right: $margin;
				}
			}
			
			
			&:before,
			&:after {
				content: "";
				display: table;
			}
			&:after {
				clear: both;
			}  
		} // .keyboard

	} // .vue-touch-keyboard
*
