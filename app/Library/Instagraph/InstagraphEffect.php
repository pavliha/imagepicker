<?php
/**
 * Created by PhpStorm.
 * User: pavel
 * Date: 5/19/16
 * Time: 6:44 PM
 */

namespace App\Library\Instagraph;


use App\Library\Instagraph\Exceptions\EffectNotFoundException;

class InstagraphEffect
{
    private $path;
    private $image;

    /**
     * InstagraphEffect constructor.
     * @param string $path
     */
    public function __construct(string $path) {
        $this->path = $path;
        $this->image = $this->loadImageFromPath();
    }

    /**
     * creates image instance
     */
    private function loadImageFromPath() {
        return imagecreatefromjpeg($this->path);
    }

    /**
     * @param string $path
     */
    public function save(string $path) {
        imagepng($this->image, $path);
        imagedestroy($this->image);
    }

    /**
     * @param string $filterName
     * @throws EffectNotFoundException
     */
    public function applyEffect(string $effect) {
        $GDeffects = new GDEffects($this->image);
        if (!method_exists($GDeffects, $effect)) {
            throw new EffectNotFoundException("effect ".$effect." does not exist");
        }
        $GDeffects->$effect();
    }

    public static function applyAllEffects($pathToSourceImage, $pathToDestFolder){

        $allEffects = "bubbles sepia sepia2 sharpen emboss cool old old2 old3 light aqua boost boost2 gray antique blackwhite blur vintage concentrate hermajesty everglow freshblue tender dream frozen forest rain orangepeel darken summer retro country washed";

        $arrayOfEffects = explode(" ", $allEffects);

        $listOfPaths = [];

        foreach ($arrayOfEffects as $filter) {


            $effect = new static($pathToSourceImage);

            $effect->applyEffect($filter);

            $fileName =  $filter. str_random(4) . ".jpg";

            $listOfNames[] = $fileName;

            $effect->save($pathToDestFolder . "/" .$fileName);


        }

        return $listOfNames;

    }

}

/** All Effects
 *
 * bubbles colorise sepia sepia2
 * sharpen emboss cool old old2
 * old3 light aqua boost boost2 gray
 * antique blackwhite blur vintage
 * concentrate hermajesty everglow
 * freshblue tender dream frozen
 * forest rain orangepeel darken
 * summer retro country washed
 */

/*
